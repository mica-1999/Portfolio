import { NextResponse } from "next/server";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
const bcrypt = require('bcrypt');
import NextAuth from "next-auth";

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  await dbConnect();

  // Manual validation
  const { name, password } = body;

  // Check for missing fields
  if (!name || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  // Check if name is a string
  if (typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: "Username must be a non-empty string" }, { status: 400 });
  }
  
  // Check if password is a string
  if (typeof password !== 'string' || password.trim() === '') {
    return NextResponse.json({ error: "Password must be a non-empty string" }, { status: 400 });
  }

  try {
    // Find user by name
    const user = await User.findOne({ username: name });
    if (!user) {
      console.log("Invalid user");
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    // Compare the plain-text password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}