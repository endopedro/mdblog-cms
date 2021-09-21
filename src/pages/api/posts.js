import Cors from 'cors'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/db'
import { extractPosts, extractPost } from '../../utils/extractors'
import {
  postsQuery,
  postQuery,
  relatedQuery,
  latestQuery,
} from '../../utils/mongoQuery'
import initMiddleware from '../../utils/initMiddleware.js'

const cors = Cors({ methods: ['GET', 'HEAD'] })

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method === 'GET') {
    const { slug, page, related, latest, author, search, category } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (slug) {
      const post = await db
        .collection('posts')
        .aggregate(postQuery(slug))
        .toArray()

      if (!post.length) {
        res.status(404).json({ message: 'Post not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: extractPost(post[0]) })
      client.close()
      return
    }

    if (related) {
      const post = await db
        .collection('posts')
        .findOne({ _id: new ObjectID(related) })

      const relatedPosts = await db
        .collection('posts')
        .aggregate(relatedQuery(post))
        .toArray()

      res.status(200).json({ result: extractPosts(relatedPosts) })
      client.close()
      return
    }

    if (latest) {
      const latestPosts = await db
        .collection('posts')
        .aggregate(latestQuery())
        .toArray()

      res.status(200).json({ result: extractPosts(latestPosts) })
      client.close()
      return
    }

    let filter = {}
    if (author) {
      const postAuthor = await db
        .collection('users')
        .findOne({ username: new RegExp(`^${author}$`, 'i') })
      filter = { authorId: postAuthor?._id }
    }
    if (search) filter = { title: new RegExp(search, 'i') }
    if (category) {
      const postCategory = await db
        .collection('categories')
        .findOne({ label: new RegExp(`^${category}$`, 'i') })
      filter = { categoryId: postCategory?._id }
    }

    const posts = await db.collection('posts')

    const filteredPosts = await posts
      .aggregate(postsQuery(page, filter))
      .toArray()

    const postsCount = await posts
      .aggregate([{ $match: filter }, { $count: 'total' }])
      .toArray()
      .then((result) => result[0])

    res.status(200).json({
      result: extractPosts(filteredPosts),
      total: postsCount ? postsCount.total : 0,
      pages: postsCount ? Math.ceil(postsCount.total / 10) : 0,
    })

    client.close()
  }

  if (req.method === 'POST') {
    const session = await getSession({ req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { title, slug, categoryId, tags, content, coverId, excerpt } = data

    if (!title || !slug || !categoryId) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingSlug = await db.collection('posts').findOne({ slug: slug })

    if (existingSlug) {
      res.status(422).json({ message: 'Slug already exists.' })
      client.close()
      return
    }

    const user = await db
      .collection('users')
      .findOne({ email: session.user.email })

    const result = await db.collection('posts').insertOne({
      title: title,
      slug: slug,
      categoryId: new ObjectID(categoryId),
      tags: tags,
      content: content,
      excerpt: excerpt,
      authorId: user._id,
      createdAt: Date.now(),
      coverId: new ObjectID(coverId),
    })

    res.status(200).json({ message: 'Post created!', result: result.ops[0] })
    client.close()
  }

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { _id, title, slug, categoryId, tags, content, coverId, excerpt } =
      data

    if (!title || !slug || !categoryId) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingSlug = await db.collection('posts').findOne({ slug: slug })

    if (existingSlug && existingSlug._id != _id) {
      res.status(422).json({ message: 'Slug already exists.' })
      client.close()
      return
    }

    const result = await db.collection('posts').findOneAndUpdate(
      {
        _id: new ObjectID(_id),
      },
      {
        $set: {
          title: title,
          slug: slug,
          categoryId: new ObjectID(categoryId),
          tags: tags,
          content: content,
          excerpt: excerpt,
          updatedAt: Date.now(),
          coverId: new ObjectID(coverId),
        },
      },
      {
        returnNewDocument: true,
      }
    )

    res.status(200).json({ message: 'Post updated!', post: result })
    // res.status(200).json({ message: 'Post updated!'})
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
      res.status(422).json({ message: 'No id given.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedPost = await db
      .collection('posts')
      .findOneAndDelete({ _id: new ObjectID(_id) })
      .then((post) => post.value)

    if (!deletedPost) {
      res.status(422).json({ message: 'Post no exists.' })
      client.close()
      return
    }

    res.status(200).json({ message: 'Post deleted!', result: deletedPost })
    client.close()
  }
}

export default handler
