import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/db'
import { cloudinaryUpload, cloudinaryDestroy } from '../../utils/cloudinary'
import { imagesQuery } from '../../utils/mongoQuery'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { _id, page } = req.query
    const client = await connectToDatabase()
    const db = client.db()

    if (_id) {
      const image = await db
        .collection('images')
        .findOne({ _id: new ObjectID(_id) })

      if (!image) {
        res.status(404).json({ message: 'Image not found.' })
        client.close()
        return
      }

      res.status(200).json({ result: image })
      client.close()
      return
    }

    const images = await db.collection('images')
    const imagesCount = await images.count()
    res.status(200).json({
      result: await images.aggregate(imagesQuery(page)).toArray(),
      total: imagesCount,
      pages: Math.ceil(imagesCount / 10),
    })

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

  if (req.method === 'PUT') {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: 'Not Authenticated.' })
      return
    }

    const { image, avatar, logo } = req.body

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

    if (avatar) {
      const user = await db
        .collection('users')
        .findOne({ _id: new ObjectID(session.user._id) })

      if (user.picture) cloudinaryDestroy(user.picture.public_id)

      const picture = {
        public_id: uploadResult.public_id,
        url: uploadResult.url,
        secure_url: uploadResult.secure_url,
      }

      const result = await db
        .collection('users')
        .findOneAndUpdate(
          { _id: new ObjectID(user._id) },
          { $set: { picture: picture } },
          { returnNewDocument: true }
        )

      res.status(200).json({ message: 'Profile updated!', result: picture })
    } else if (logo) {
      const currentLogo = await db
        .collection('settings')
        .findOne({ type: 'logo' })

      if (currentLogo) cloudinaryDestroy(currentLogo.data.public_id)

      const data = {
        public_id: uploadResult.public_id,
        url: uploadResult.url,
        secure_url: uploadResult.secure_url,
      }

      const result = await db
        .collection('settings')
        .updateOne({ type: 'logo' }, { $set: { data: data } }, { upsert: true })

      res.status(200).json({
        message: 'Logo updated!',
        result: { ...currentLogo, data: data },
      })
    }

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

    res.status(200).json({ message: 'Image deleted!', result: deletedImage })
    client.close()
  }
}

export default handler
