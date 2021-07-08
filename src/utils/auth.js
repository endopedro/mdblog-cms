import { hash, compare } from 'bcryptjs'

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}

const extractUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  bio: user.bio,
})

export { hashPassword, extractUser }
