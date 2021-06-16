import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { slug } = req.query

    if (!slug) {
      res.status(404).json({ message: 'Post not found.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const post = await db.collection('posts').findOne({ slug: slug })

    if (!post) {
      res.status(404).json({ message: 'Post not found.' })
      client.close()
      return
    }

    res.status(200).json({ post: post })
    client.close()
  }

  if (req.method === 'POST') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const data = req.body
    const { title, slug, category, tags, content } = data

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
      category: category,
      tags: tags,
      content: content,
      authorId: user._id,
    })

    res.status(200).json({ message: 'Post created!', post: result.ops[0] })
    client.close()
  }
}

export default handler
