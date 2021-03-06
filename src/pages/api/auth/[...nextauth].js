import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { connectToDatabase } from '../../../utils/db'
import { extractUser, verifyPassword } from '../../../utils/auth'

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, user) => {
      return Promise.resolve({ ...session, user })
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      return Promise.resolve(user || token)
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase()
        const usersCollection = client.db().collection('users')
        const user = await usersCollection.findOne({
          username: credentials.username,
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
        return extractUser(user)
      },
    }),
  ],
})
