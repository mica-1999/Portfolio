import { NextResponse } from "next/server";
import User from "/src/models/User";
import dbConnect from "/src/utils/dbConnect";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getRandUserPassword } from "/src/utils/apiUtils"

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    await dbConnect();
    try {
        if(userId){
            const user_data = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });
            return NextResponse.json(user_data);
        }
        const user_data = await User.find();
        return NextResponse.json(user_data);
    } catch (error) {
        return NextResponse.json({error:'Couldnt fetch projects data'},{status:500});
    }
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    console.log(username);
    await dbConnect();
    try {
        const deletedUser = await User.findOneAndDelete({ username: username });
        if (!deletedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Could not delete user' }, { status: 500 });
    }
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  await dbConnect();

  const { firstName, lastName, email, phone, role, linkedProject } = body;

  // Server-side validation
  if (!firstName || !lastName || !email || !phone || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

  if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
  }
  
  const { username, password } = getRandUserPassword(firstName, lastName);
  console.log(username, password);
  const genPassword = await hashPassword(password);

  try {
    const projects = Array.isArray(linkedProject) ? linkedProject.map(project => mongoose.Types.ObjectId(project)) : [];
    const newUser = new User({
        username: username,
        password: genPassword,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        role: role,
        isActive: 'active',
        lastLogin: Date.now(),
        projects: projects
    });

    const user = await newUser.save();
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: 'Couldn\'t create a new user' }, { status: 500 });
  }
}