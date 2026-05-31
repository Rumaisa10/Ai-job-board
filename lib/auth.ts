import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { connectDB } from './db'
import { User } from '@/models/User'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        if (!user) return null
        return user
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB()
      const existing = await User.findOne({ email: user.email })
      if (!existing) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image
        })
      }
      return true
    },
    async session({ session }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.id = dbUser._id.toString()
        session.user.role = dbUser.role
      }
      return session
    }
  }
})