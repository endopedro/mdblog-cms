import crypto from 'crypto'
import mailjet from 'node-mailjet'

import { connectToDatabase } from '../../../utils/db'
import { hashPassword } from '../../../utils/auth'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { token } = req.query

    if (!token) {
      res.status(422).json({ message: 'No token found.' })
      client.close()
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const tokenDoc = await db.collection('tokens').findOne({
      token: token,
      type: 'passwordReset',
    })

    if (tokenDoc) {
      res.status(200).send({ message: 'Valid token.' })
    } else {
      res.status(422).send({ message: 'Invalid token.' })
    }

    client.close()
  }

  if (req.method === 'PUT') {
    const data = req.body
    const { password, confirm_password, token } = data

    if (!password || !confirm_password)
      res.status(422).json({ message: 'Incomplete information.' })

    if (password != confirm_password)
      res.status(422).json({ message: 'Passwords must be identical.' })

    const client = await connectToDatabase()
    const db = client.db()

    const { value: tokenDoc } = await db
      .collection('tokens')
      .findOneAndDelete({ token, type: 'passwordReset' })

    if (!tokenDoc) {
      res.status(422).json({ message: 'This link may have been expired.' })
      client.close()
      return
    }
    const hashedPassword = await hashPassword(password)

    const updatePassword = await db
      .collection('users')
      .updateOne(
        { _id: tokenDoc.userId },
        { $set: { password: hashedPassword } }
      )

    if (updatePassword)
      res.status(200).json({ message: 'Your password has been updated.' })
    else res.status(422).json({ message: 'Server problem.' })
    client.close()
  }

  if (req.method === 'POST') {
    const data = req.body
    const { email } = data

    if (!email) res.status(422).json({ message: 'No e-mail given.' })

    const client = await connectToDatabase()
    const db = client.db()
    db.collection('tokens').createIndex(
      { expireAt: 1 },
      { expireAfterSeconds: 0 }
    )

    const existingUser = await db.collection('users').findOne({ email: email })

    if (!existingUser) {
      res.status(200).send()
      client.close()
      return
    }

    const token = crypto.randomBytes(32).toString('hex')

    await db
      .collection('tokens')
      .findOneAndDelete({ userId: existingUser._id, type: 'passwordReset' })

    await db.collection('tokens').insertOne({
      token,
      userId: existingUser._id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20),
    })

    const mailjetClient = await mailjet.connect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
    )

    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.APPLICATION_MAIL,
            Name: 'noreply',
          },
          To: [
            {
              Email: existingUser.email,
              Name: existingUser.name,
            },
          ],
          Subject: 'Password Recovery',
          TextPart: `${existingUser.name}, this is your password recovery.`,
          HTMLPart: `<h3>${existingUser.name}, click <a href=\"${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${token}\">here</a> to recover your password!</h3>`,
        },
      ],
    })

    res.status(200).send()
    client.close()
  }
}

export default handler
