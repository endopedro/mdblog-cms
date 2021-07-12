import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'
import { hashPassword, extractUser, verifyPassword } from '../../utils/auth'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { _id, page } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (!_id) {
      const users = await db.collection('users').find()
      if (page) {
        res.status(200).json({
          result: await users
            .skip(10 * (page - 1))
            .limit(10)
            .toArray(),
          total: await users.count(),
          pages: Math.ceil((await users.count()) / 10),
        })
      } else {
        res.status(200).json({
          result: await (
            await users.toArray()
          ).map((user) => extractUser(user)),
        })
      }
    } else {
      const user = await db
        .collection('users')
        .findOne({ _id: new ObjectID(_id) })

      if (!user) {
        res.status(404).json({ message: 'User not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: extractUser(user) })
    }

    client.close()
  }

  if (req.method === 'POST') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { name, email, password } = data

    if (!name || !email || !password) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingEmail = await db.collection('users').findOne({ email: email })

    if (existingEmail) {
      res.status(422).json({ message: 'Email already registered.' })
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
      name: name,
      email: email,
      password: hashedPassword,
    })

    const user = extractUser(result.ops[0])

    res.status(200).json({ message: 'User created!', result: user })
    client.close()
  }

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { id, name, email, password, bio, current_password, profile } = data

    if (!id) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingEmail = await db.collection('users').findOne({ email: email })

    if (existingEmail && existingEmail._id != id) {
      res.status(422).json({ message: 'Email already exists.' })
      client.close()
      return
    }

    if (profile && password) {
      const isValid = await verifyPassword(
        current_password ? current_password : '',
        existingEmail.password
      )
      if (!isValid) {
        res.status(422).json({ message: 'Incorrect Password' })
        client.close()
        return
      }
    }

    const hashedPassword = password ? await hashPassword(password) : null

    const result = await db.collection('users').findOneAndUpdate(
      {
        _id: new ObjectID(id),
      },
      {
        $set: {
          name: name,
          email: email,
          bio: bio,
          ...(password && { password: hashedPassword }),
        },
      },
      {
        returnNewDocument: true,
      }
    )

    res.status(200).json({ message: 'User updated!', result: result })
    client.close()
  }

  if (req.method === 'DELETE') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { _id } = req.body

    if (!_id) {
      res.status(422).json({ message: 'No ID given.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedUser = await db
      .collection('users')
      .findOneAndDelete({ _id: new ObjectID(_id) })
      .then((user) => user.value)

    if (!deletedUser) {
      res.status(422).json({ message: 'Email no exists.' })
      client.close()
      return
    }

    res.status(200).json({ message: 'User deleted!', result: deletedUser })
    client.close()
  }
}

export default handler
