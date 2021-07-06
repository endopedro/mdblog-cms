import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { email } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (!email) {
      const users = await db.collection('users').find().toArray()
      res.status(200).json({ users: users })
    } else {
      const user = await db.collection('users').findOne({ user: user })

      if (!user) {
        res.status(404).json({ message: 'User not found.' })
        client.close()
        return
      }

      res.status(200).json({ user: user })
    }

    client.close()
  }

  // if (req.method === 'POST') {
  //   const session = await getSession({ req: req })
  //   if (!session) {
  //     res.status(401).json({ message: 'Not Authenticated.' })
  //     return
  //   }

  //   const data = req.body
  //   const { title, slug, category, tags, content } = data

  //   if (!title || !slug || !category) {
  //     res.status(422).json({ message: 'Incomplete information.' })
  //     return
  //   }

  //   const client = await connectToDatabase()
  //   const db = client.db()

  //   const existingSlug = await db.collection('posts').findOne({ slug: slug })

  //   if (existingSlug) {
  //     res.status(422).json({ message: 'Slug already exists.' })
  //     client.close()
  //     return
  //   }

  //   const user = await db
  //     .collection('users')
  //     .findOne({ email: session.user.email })

  //   const result = await db.collection('posts').insertOne({
  //     title: title,
  //     slug: slug,
  //     category: category,
  //     tags: tags,
  //     content: content,
  //     authorId: user._id,
  //     createdAt: Date.now(),
  //   })

  //   res.status(200).json({ message: 'Post created!', post: result.ops[0] })
  //   client.close()
  // }

  // if (req.method === 'PUT') {
  //   const session = await getSession({ req: req })
  //   if (!session) {
  //     res.status(401).json({ message: 'Not Authenticated.' })
  //     return
  //   }

  //   const data = req.body
  //   const { _id, title, slug, category, tags, content } = data

  //   if (!title || !slug || !category) {
  //     res.status(422).json({ message: 'Incomplete information.' })
  //     return
  //   }

  //   const client = await connectToDatabase()
  //   const db = client.db()

  //   const existingSlug = await db.collection('posts').findOne({ slug: slug })

  //   if (existingSlug && existingSlug._id != _id) {
  //     res.status(422).json({ message: 'Slug already exists.' })
  //     client.close()
  //     return
  //   }

  //   const result = await db.collection('posts').findOneAndUpdate(
  //     {
  //       _id: new ObjectID(_id)
  //     },
  //     {$set:{
  //       title: title,
  //       slug: slug,
  //       category: category,
  //       tags: tags,
  //       content: content,
  //       updatedAt: Date.now()
  //     }},
  //     {
  //       returnNewDocument: true
  //     }
  //   )

  //   res.status(200).json({ message: 'Post updated!', post: result })
  //   // res.status(200).json({ message: 'Post updated!'})
  //   client.close()
  // }

  // if (req.method === 'DELETE') {
  //   const session = await getSession({ req: req })
  //   if (!session) {
  //     res.status(401).json({ message: 'Not Authenticated.' })
  //     return
  //   }

  //   const { slug } = req.body

  //   if (!slug) {
  //     res.status(422).json({ message: 'No slug given.' })
  //     return
  //   }

  //   const client = await connectToDatabase()
  //   const db = client.db()

  //   const deletedPost = await db
  //     .collection('posts')
  //     .findOneAndDelete({ slug: slug })
  //     .then((post) => post.value)

  //   if (!deletedPost) {
  //     res.status(422).json({ message: 'Slug no exists.' })
  //     client.close()
  //     return
  //   }

  //   res.status(200).json({ message: 'Post deleted!', post: deletedPost })
  //   client.close()
  // }
}

export default handler
