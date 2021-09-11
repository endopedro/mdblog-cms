import Cors from 'cors'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { pagesQuery, pageQuery } from '../../utils/mongoQuery'
import { connectToDatabase } from '../../utils/db'
import { extractPages, extractPage } from '../../utils/extractors'
import initMiddleware from '../../utils/initMiddleware.js'

const cors = Cors({ methods: ['GET', 'HEAD'] })

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method === 'GET') {
    const { slug, page } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (slug) {
      const pageObj = await db
        .collection('pages')
        .aggregate(pageQuery(slug))
        .toArray()

      if (!pageObj.length) {
        res.status(404).json({ message: 'Page not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: extractPage(pageObj[0]) })
      client.close()
      return
    }

    const pages = await db.collection('pages')
    const pagesCount = await pages.count()
    res.status(200).json({
      result: extractPages(await pages.aggregate(pagesQuery(page)).toArray()),
      total: pagesCount,
      pages: Math.ceil(pagesCount / 10),
    })

    client.close()
  }

  if (req.method === 'POST') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { title, slug, content, coverId } = data

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
      coverId: new ObjectID(coverId),
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
    const { _id, title, slug, content, coverId } = data

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
          coverId: new ObjectID(coverId),
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
