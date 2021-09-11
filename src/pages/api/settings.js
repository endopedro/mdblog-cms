import Cors from 'cors'
import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import _ from 'lodash'
import initMiddleware from '../../utils/initMiddleware.js'

const cors = Cors({ methods: ['GET', 'HEAD'] })

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method === 'GET') {
    const { metrics } = req.query

    const client = await connectToDatabase()
    const db = client.db()

    if (metrics) {
      const users = await db.collection('users').find().count()

      res.status(200).json({
        result: {
          users: users,
        },
      })

      client.close()
      return
    }

    const settings = await db.collection('settings').find().toArray()
    res.status(200).json({
      result: {
        logo: _.find(settings, ['type', 'logo']),
        title: _.find(settings, ['type', 'info'])?.title,
        name: _.find(settings, ['type', 'info']).name,
        description: _.find(settings, ['type', 'info'])?.description,
      },
    })

    client.close()
  }

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })

    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { title, description, name } = data

    const client = await connectToDatabase()
    const db = client.db()

    const result = await db
      .collection('settings')
      .updateOne(
        { type: 'info' },
        { $set: { title: title, description: description, name: name } },
        { upsert: true }
      )

    const settings = await db.collection('settings').find().toArray()

    res.status(200).json({
      message: 'Settings updated!',
      result: {
        logo: _.find(settings, ['type', 'logo']),
        title: _.find(settings, ['type', 'info']).title,
        name: _.find(settings, ['type', 'info']).name,
        description: _.find(settings, ['type', 'info']).description,
      },
    })
    client.close()
  }
}

export default handler
