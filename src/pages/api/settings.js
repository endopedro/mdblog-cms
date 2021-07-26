import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import _ from 'lodash'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectToDatabase()
    const db = client.db()

    const settings = await db.collection('settings').find().toArray()

    res.status(200).json({
      result: {
        logo: _.find(settings, ['type', 'logo']),
        title: _.find(settings, ['type', 'info']).title,
        description: _.find(settings, ['type', 'info']).description,
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
    const { title, description } = data

    const client = await connectToDatabase()
    const db = client.db()

    const result = await db
      .collection('settings')
      .updateOne(
        { type: 'info' },
        { $set: { title: title, description: description } },
        { upsert: true }
      )

    const settings = await db.collection('settings').find().toArray()

    res.status(200).json({
      message: 'Settings updated!',
      result: {
        logo: _.find(settings, ['type', 'logo']),
        title: _.find(settings, ['type', 'info']).title,
        description: _.find(settings, ['type', 'info']).description,
      },
    })
    client.close()
  }
}

export default handler
