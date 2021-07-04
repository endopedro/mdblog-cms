import { MongoClient } from 'mongodb'

const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  )
  return client
}

export { connectToDatabase }
