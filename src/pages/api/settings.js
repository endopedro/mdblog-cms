import Cors from 'cors'
import { ObjectID } from 'mongodb'
import { getSession } from 'next-auth/client'
import _ from 'lodash'

import { connectToDatabase } from '../../utils/db'
import initMiddleware from '../../utils/initMiddleware.js'
import { settingsQuery } from '../../utils/mongoQuery'
import { extractSettings } from '../../utils/extractors'

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

    const settings = await db
      .collection('settings')
      .aggregate(settingsQuery)
      .toArray()

    const pages = await db
      .collection('pages')
      .aggregate([{ $project: { slug: 1 } }])
      .toArray()

    res
      .status(200)
      .json({ result: { ...extractSettings(settings[0]), pages: pages } })

    client.close()
  }

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })

    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { title, description, name, coverId } = data

    const client = await connectToDatabase()
    const db = client.db()

    const result = await db.collection('settings').updateOne(
      { type: 'info' },
      {
        $set: {
          title: title,
          description: description,
          name: name,
          coverId: new ObjectID(coverId),
        },
      },
      { upsert: true }
    )

    const settings = await db.collection('settings').find().toArray()

    res.status(200).json({
      message: 'Settings updated!',
      result: {
        logo: _.find(settings, ['type', 'logo']),
        title: _.find(settings, ['type', 'info']).title,
        name: _.find(settings, ['type', 'info']).name,
        coverId: _.find(settings, ['type', 'info']).coverId,
        description: _.find(settings, ['type', 'info']).description,
      },
    })
    client.close()
  }
}

export default handler
