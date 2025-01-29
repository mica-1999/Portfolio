import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoClient } from "mongodb"
const bcrypt = require('bcrypt');

// MongoDB setup (use your connection string here)
const client = new MongoClient(process.env.MONGODB_URI)

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials", // You can name it anything you like
      credentials: {
        username: { label: "User", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await client.connect()
          const db = client.db("Portfolio")
          const usersCollection = db.collection("users")

          const user = await usersCollection.findOne({ username: credentials.name })
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            // If credentials are valid, return the user object
            return { id: user._id, username: user.username }
          }
          // If no user or invalid password, return null
          return null
        } catch (error) {
          console.error(error)
          return null
        } finally {
          await client.close()
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user information in the JWT token
      if (user) {
        token.id = user.id
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      // Add the JWT token data to the session
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
      }
      return session
    },
  },
  pages: {
    signIn: "/pages/login", // Custom login page
  },
})

export { handler as GET, handler as POST }
