import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (!id) {
      const categories = await db.collection('categories').find().toArray()
      res.status(200).json({ categories: categories })
    } else {
      const category = await db.collection('categories').findOne({ _id: id })

      if (!category) {
        res.status(404).json({ message: 'Category not found.' })
        client.close()
        return
      }

      res.status(200).json({ category: category })
    }

    client.close()
  }

  if (req.method === 'POST') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { label } = req.body

    if (!label) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingCategory = await db
      .collection('categories')
      .findOne({ label: label })

    if (existingCategory) {
      res.status(422).json({ message: 'Category already exists.' })
      client.close()
      return
    }

    const result = await db.collection('categories').insertOne({
      label: label,
    })

    res
      .status(200)
      .json({ message: 'Category created!', category: result.ops[0] })
    client.close()
  }

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { _id, label } = req.body

    if (!label) {
      res.status(422).json({ message: 'Incomplete information.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingCategory = await db
      .collection('categories')
      .findOne({ label: label })

    if (existingCategory && existingCategory._id != _id) {
      res.status(422).json({ message: 'Slug already exists.' })
      client.close()
      return
    }

    const result = await db
      .collection('categories')
      .findOneAndUpdate(
        { _id: new ObjectID(_id) },
        { $set: { label: label } },
        { returnNewDocument: true }
      )

    res.status(200).json({ message: 'Category updated!', category: result })
    client.close()
  }

  if (req.method === 'DELETE') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { id } = req.body

    if (!id) {
      res.status(422).json({ message: 'No category id given.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedCategory = await db
      .collection('categories')
      .findOneAndDelete({ _id: id })
      .then((category) => category.value)

    if (!deletedCategory) {
      res.status(422).json({ message: 'Category id do not exists.' })
      client.close()
      return
    }

    res
      .status(200)
      .json({ message: 'Category deleted!', category: deletedCategory })

    client.close()
  }
}

export default handler
