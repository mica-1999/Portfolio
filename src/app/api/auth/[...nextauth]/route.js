import NextAuth from "next-auth"; // Core foundation for the Authentication API in Next.js
import { NextResponse } from "next/server"; // Allows us to send responses to the client
import Session from "/src/models/Session"; // Log of user sessions
import CredentialsProvider from "next-auth/providers/credentials"; // Allows custom authentication (we're using MongoDB)
import bcrypt from 'bcrypt'; // Hashes passwords for security
import dbConnect from '/src/utils/dbConnect'; // Connects to the MongoDB database
import mongoose from 'mongoose'; // Allows us to interact with the MongoDB database

const addSession = async (userId,db) => {
  try {
    const findSession = await db.collection("sessions").findOne({ userId: userId });
    const currentTimestamp = new Date();
    if(findSession){
      // Then we add a new timestamp to the session
      await db.collection("sessions").updateOne({ userId: userId },{ $push: { timestamps: currentTimestamp } });
      console.log(`Added timestamp: ${currentTimestamp} to session for user: ${userId}`);
    }
    else {
      // If the session does not exist, we create it
      const newSession = new Session({
        userId: userId,
        timestamps: [new Date()]
      });
      await newSession.save();
    }
  } catch (error) {
    console.error("Error during session creation:", error);
    return NextResponse.json({ error: "Error during session creation" }, { status: 500 });
  }
}

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

          // Verify if the user has a session
          addSession(user._id, db);

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
    // This callback is called whenever a JWT token is created or updated.
    async jwt({ token, user }) {
      // If 'user' exists, it means this function is running during login
      if (user) {
        // Add user details to the token
        token.id = user.id;
        token.username = user.username;
        token.first_name = user.first_name; 
        token.last_name = user.last_name;  
        token.role = user.role;              
      }
      // Return the updated token, which will be used in future requests
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
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  pages: {
    signIn: "/pages/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };