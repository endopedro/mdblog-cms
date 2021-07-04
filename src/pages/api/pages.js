import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { slug } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (!slug) {
      const pages = await db.collection('pages').find().toArray()
      res.status(200).json({ pages: pages })
    } else {
      const page = await db.collection('pages').findOne({ slug: slug })

      if (!page) {
        res.status(404).json({ message: 'Page not found.' })
        client.close()
        return
      }

      res.status(200).json({ page: page })
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
    const { title, slug, content } = data

    if (!title || !slug) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingSlug = await db.collection('pages').findOne({ slug: slug })

    if (existingSlug) {
      res.status(422).json({ message: 'Slug already exists.' })
      client.close()
      return
    }

    const result = await db.collection('pages').insertOne({
      title: title,
      slug: slug,
      content: content,
      createdAt: Date.now(),
    })

    res.status(200).json({ message: 'Page created!', page: result.ops[0] })
    client.close()
  }

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { _id, title, slug, content } = data

    if (!title || !slug) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingSlug = await db.collection('pages').findOne({ slug: slug })

    if (existingSlug && existingSlug._id != _id) {
      res.status(422).json({ message: 'Slug already exists.' })
      client.close()
      return
    }

    const result = await db.collection('pages').findOneAndUpdate(
      {
        _id: new ObjectID(_id),
      },
      {
        $set: {
          title: title,
          slug: slug,
          content: content,
          updatedAt: Date.now(),
        },
      },
      {
        returnNewDocument: true,
      }
    )

    res.status(200).json({ message: 'Page updated!', page: result })
    client.close()
  }

  if (req.method === 'DELETE') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { slug } = req.body

    if (!slug) {
      res.status(422).json({ message: 'No slug given.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedPage = await db
      .collection('pages')
      .findOneAndDelete({ slug: slug })
      .then((page) => page.value)

    if (!deletedPage) {
      res.status(422).json({ message: 'Slug no exists.' })
      client.close()
      return
    }

    res.status(200).json({ message: 'Page deleted!', page: deletedPage })
    client.close()
  }
}

export default handler
