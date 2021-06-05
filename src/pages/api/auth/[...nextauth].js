import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { connectToDatabase } from '../../../utils/db'
import { extractUser, verifyPassword } from '../../../utils/auth'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase()
        const usersCollection = client.db().collection('users')
        const user = await usersCollection.findOne({
          email: credentials.email,
        })

        if (!user) {
          client.close()
          throw new Error('Incorrect credentials.')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          client.close()
          throw new Error('Incorrect credentials.')
        }

        client.close()
        return { user: extractUser(user) }
      },
    }),
  ],
})
