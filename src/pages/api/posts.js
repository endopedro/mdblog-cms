import Cors from 'cors'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/db'
import { extractPosts, extractPost } from '../../utils/extractors'
import { postsQuery, postQuery, relatedQuery } from '../../utils/mongoQuery'
import initMiddleware from '../../utils/initMiddleware,js'

const cors = Cors({ methods: ['GET', 'HEAD'] })

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method === 'GET') {
    const { slug, page, related } = req.query
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

    const posts = await db.collection('posts')
    const postsCount = await posts.count()
    res.status(200).json({
      result: extractPosts(await posts.aggregate(postsQuery(page)).toArray()),
      total: postsCount,
      pages: Math.ceil(postsCount / 10),
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
    const { title, slug, category, tags, content, coverId, excerpt } = data

    if (!title || !slug || !category) {
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
      categoryId: new ObjectID(category),
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
    const { _id, title, slug, category, tags, content, coverId, excerpt } = data

    if (!title || !slug || !category) {
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
          categoryId: new ObjectID(category),
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
