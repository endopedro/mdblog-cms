import { connectToDatabase } from '../../utils/db'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'
import { cloudinaryUpload, cloudinaryDestroy } from '../../utils/cloudinary'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { _id, page } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (!_id) {
      const images = await db.collection('images').find()
      if (page) {
        res.status(200).json({
          result: await images
            .skip(10 * (page - 1))
            .limit(10)
            .toArray(),
          total: await images.count(),
          pages: Math.ceil((await images.count()) / 10),
        })
      } else {
        res.status(200).json({ result: await images.toArray() })
      }
    } else {
      const image = await db.collection('images').findOne({ _id: _id })

      if (!image) {
        res.status(404).json({ message: 'Image not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: image })
    }

    client.close()
  }

  if (req.method === 'POST') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { image } = req.body

    if (!image) {
      res.status(422).json({ message: 'No image given' })
      return
    }

    const uploadResult = await cloudinaryUpload(image)

    if (!uploadResult) {
      res.status(422).json({ message: 'Error' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const result = await db.collection('images').insertOne({
      public_id: uploadResult.public_id,
      url: uploadResult.url,
      secure_url: uploadResult.secure_url,
    })

    res.status(200).json({ message: 'Image uploaded!', result: result.ops[0] })
    client.close()
  }

  if (req.method === 'DELETE') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { public_id } = req.body

    if (!public_id) {
      res.status(422).json({ message: 'No id given.' })
      return
    }

    const deleteResult = await cloudinaryDestroy(public_id)
    console.log('deleteResult', deleteResult)

    if (!deleteResult) {
      res.status(422).json({ message: 'Error' })
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const deletedImage = await db
      .collection('images')
      .findOneAndDelete({ public_id: public_id })
      .then((image) => image.value)

    if (!deletedImage) {
      res.status(422).json({ message: 'Image no exists.' })
      client.close()
      return
    }

    console.log('deletedImage', deletedImage)

    res.status(200).json({ message: 'Image deleted!', result: deletedImage })
    client.close()
  }
}

export default handler
