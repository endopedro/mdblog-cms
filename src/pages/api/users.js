import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'
import { hashPassword, extractUser } from '../../utils/auth'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { email } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (!email) {
      const users = await db.collection('users').find().toArray()
      res.status(200).json({ users: users.map((u) => extractUser(u)) })
    } else {
      const user = await db.collection('users').findOne({ user: user })

      if (!user) {
        res.status(404).json({ message: 'User not found.' })
        client.close()
        return
      }

      res.status(200).json({ user: extractUser(user) })
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

    res.status(200).json({ message: 'User created!', user: user })
    client.close()
  }

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { id, name, email, password } = data

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

    const hashedPassword = password ? await hashPassword(password) : null

    const result = await db.collection('users').findOneAndUpdate(
      {
        _id: new ObjectID(id),
      },
      {
        $set: {
          ...(name && { name: name }),
          ...(email && { email: email }),
          ...(password && { password: hashedPassword }),
        },
      },
      {
        returnNewDocument: true,
      }
    )

    res.status(200).json({ message: 'User updated!', user: result })
    client.close()
  }

  if (req.method === 'DELETE') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { email } = req.body

    if (!email) {
      res.status(422).json({ message: 'No ID given.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedUser = await db
      .collection('users')
      .findOneAndDelete({ email: email })
      .then((user) => user.value)

    if (!deletedUser) {
      res.status(422).json({ message: 'Email no exists.' })
      client.close()
      return
    }

    res.status(200).json({ message: 'User deleted!', user: deletedUser })
    client.close()
  }
}

export default handler
