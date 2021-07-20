const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryUpload = (file) =>
  cloudinary.uploader.upload(file, {
    folder: process.env.CLOUDINARY_ASSETS_FOLDER,
  })

const cloudinaryDestroy = (file) =>
  cloudinary.uploader.destroy(file, (error, result) =>
    console.log(result, error)
  )

const extractImage = (image) => ({
  public_id: image.public_id,
  url: image.url,
  secure_url: image.secure_url,
})

export { cloudinaryUpload, cloudinaryDestroy }
