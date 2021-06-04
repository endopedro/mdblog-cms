import { connectToDatabase } from '../../utils/db'
import { hashPassword } from '../../utils/auth'

const handler = async (req, res) => {
  const data = req.body
  const { email, password } = data

  if (!email || !password) {
    res.status(422).json({ message: 'No email or password given.' })
  }

  const client = await connectToDatabase()
  const db = client.db()

  const hashedPassword = await hashPassword(password)

  const result = await db.collection('users').insertOne({
    user: user,
    password: hashedPassword,
  })

  res.status(200).json({ message: 'User created', user: result })
}

export default handler
