import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import dbConnect from '/src/utils/dbConnect';
import mongoose from 'mongoose';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "User", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const db = mongoose.connection.db;
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({ username: credentials.name });
          if(!user){
            console.log("User not found");
            return null;
          }

          // Validate Password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if(!isPasswordValid){
            console.log("Invalid password");
            return null;
          }

          // Return user object (without sensitive data)
          return { id: user._id, username: user.username, first_name: user.firstName, last_name: user.lastName, role: user.role  };
        } 
        catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.first_name = user.first_name; 
        token.last_name = user.last_name;  
        token.role = user.role;              
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.first_name = token.first_name;  
        session.user.last_name = token.last_name;    
        session.user.role = token.role;        
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };