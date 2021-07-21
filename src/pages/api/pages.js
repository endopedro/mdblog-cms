import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { slug, page } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (!slug) {
      const pages = await db.collection('pages').find()
      if (page) {
        res.status(200).json({
          result: await pages
            .skip(10 * (page - 1))
            .limit(10)
            .toArray(),
          total: await pages.count(),
          pages: Math.ceil((await pages.count()) / 10),
        })
      } else {
        res.status(200).json({ result: await pages.toArray() })
      }
    } else {
      const pageObj = await db.collection('pages').findOne({ slug: slug })

      if (!pageObj) {
        res.status(404).json({ message: 'Post not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: pageObj })
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
    const { title, slug, content, cover_image } = data

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
      cover_image: cover_image,
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
    const { _id, title, slug, content, cover_image } = data

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
          cover_image: cover_image,
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

    const { _id } = req.body

    if (!_id) {
      res.status(422).json({ message: 'No slug given.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedPage = await db
      .collection('pages')
      .findOneAndDelete({ _id: new ObjectID(_id) })
      .then((page) => page.value)

    if (!deletedPage) {
      res.status(422).json({ message: 'Page no exists.' })
      client.close()
      return
    }

    res.status(200).json({ message: 'Page deleted!', result: deletedPage })
    client.close()
  }
}

export default handler
