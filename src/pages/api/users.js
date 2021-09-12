import Cors from 'cors'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/db'
import { hashPassword, verifyPassword } from '../../utils/auth'
import initMiddleware from '../../utils/initMiddleware.js'
import { extractUsers, extractUser } from '../../utils/extractors'
import { usersQuery } from '../../utils/mongoQuery'

const cors = Cors({ methods: ['GET', 'HEAD'] })

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method === 'GET') {
    const { _id, page, main_user, username } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (_id) {
      const user = await db
        .collection('users')
        .findOne({ _id: new ObjectID(_id) })

      if (!user) {
        res.status(404).json({ message: 'User not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: extractUser(user) })
      client.close()
      return
    }

    if (username) {
      const user = await db.collection('users').findOne({ username: username })

      if (!user) {
        res.status(404).json({ message: 'User not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: extractUser(user) })
      client.close()
      return
    }

    if (main_user) {
      const user = await db.collection('users').findOne({ super: true })

      if (!user) {
        res.status(404).json({ message: 'User not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: extractUser(user) })
      client.close()
      return
    }

    const users = await db.collection('users')
    const usersCount = await users.count()
    res.status(200).json({
      result: extractUsers(await users.aggregate(usersQuery(page)).toArray()),
      total: usersCount,
      pages: Math.ceil(usersCount / 10),
    })

    client.close()
  }

  if (req.method === 'POST') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    if (!session.user.super) {
      res.status(401).json({ message: 'You have no permission.' })
      return
    }

    const data = req.body
    const { name, email, password, username } = data

    if (!name || !email || !password || !username) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingUserEmail = await db
      .collection('users')
      .findOne({ email: email })
    const existingUserUsername = await db
      .collection('users')
      .findOne({ username: username })

    if (existingUserEmail || existingUserUsername) {
      res.status(422).json({
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
      username: username,
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
    const {
      id,
      name,
      email,
      password,
      bio,
      current_password,
      profile,
      username,
    } = data

    if (!id) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingUserEmail = await db
      .collection('users')
      .findOne({ email: email })
    const existingUserUsername = await db
      .collection('users')
      .findOne({ username: username })

    if (existingUserEmail || existingUserUsername) {
      res.status(422).json({
        message: `${
          existingUserEmail ? 'Email' : 'Username'
        } already been taken.`,
      })
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
          username: username,
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
