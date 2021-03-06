import Cors from 'cors'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/db'
import initMiddleware from '../../utils/initMiddleware.js'
import { categoriesQuery } from '../../utils/mongoQuery'

const cors = Cors({ methods: ['GET', 'HEAD'] })

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method === 'GET') {
    const { _id, page } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (_id) {
      const category = await db
        .collection('categories')
        .findOne({ _id: new ObjectID(_id) })

      if (!category) {
        res.status(404).json({ message: 'Category not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: category })
      client.close()
      return
    }

    const categories = await db.collection('categories')

    if (page) {
      const categoriesCount = await categories.count()
      res.status(200).json({
        result: await categories.aggregate(categoriesQuery(page)).toArray(),
        total: categoriesCount,
        pages: Math.ceil(categoriesCount / 10),
      })

      client.close()
      return
    }

    res.status(200).json({ result: await categories.find().toArray() })

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

    res.status(200).json({
      message: 'Category updated!',
      oldEntry: result.value,
      result: { _id: _id, label: label },
    })

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
      res.status(422).json({ message: 'No category id given.' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedCategory = await db
      .collection('categories')
      .findOneAndDelete({ _id: new ObjectID(_id) })
      .then((category) => category.value)

    if (!deletedCategory) {
      res.status(422).json({ message: 'Category id do not exists.' })
      client.close()
      return
    }

    res
      .status(200)
      .json({ message: 'Category deleted!', result: deletedCategory })

    client.close()
  }
}

export default handler
