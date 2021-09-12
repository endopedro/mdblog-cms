import { connectToDatabase } from '../../../utils/db'
import { hashPassword, extractUser } from '../../../utils/auth'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body
    const { name, email, username, password, confirm_password } = data

    if (!name || !email || !password || !confirm_password || !username)
      res.status(422).json({ message: 'Incomplete information.' })

    if (password != confirm_password)
      res.status(422).json({ message: 'Passwords must be identical.' })

    const client = await connectToDatabase()
    const db = client.db()

    const existingUserEmail = await db
      .collection('users')
      .findOne({ email: email })
    const existingUserUsername = await db
      .collection('users')
      .findOne({ username: username })

    if (existingUserEmail || existingUserUsername) {
      res
        .status(422)
        .json({
          message: `${
            existingUserEmail ? 'Email' : 'Username'
          } already been taken.`,
        })
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
      name: name,
      email: email,
      username: username,
      password: hashedPassword,
      super: true,
    })

    const user = extractUser(result.ops[0])

    res.status(200).json({ message: 'User created!', user: user })
    client.close()
  }
}

export default handler
