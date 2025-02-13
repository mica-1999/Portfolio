import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
import dbConnect from "/src/utils/dbConnect";
import mongoose from 'mongoose';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatroomId');
  await dbConnect();
  try {
      const chatMsgs = await Chatroom.find({ chatroomId: chatId });
      return NextResponse.json(chatMsgs);
  } catch (error) {
      return NextResponse.json({error:'Couldnt fetch messages'},{status:500});
  }
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  await dbConnect();

  const { message, userId, chatroomId } = body;

  // Server-side validation
  if (!message || !userId || !chatroomId) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  else if (message.length > 500) {
    return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
  }

  try {
    const newMessage = new Chatroom({
        message: message,
        chatroomId: chatroomId,
        timestampMsg: Date.now(),
        file: "",
        sender: new mongoose.Types.ObjectId(userId)
    });
    const savedMessage = await newMessage.save();

    return NextResponse.json(savedMessage);
  } catch (error) {
    console.error("Error saving messafe:", error);
    return NextResponse.json({ error: 'Couldn\'t store message' }, { status: 500 });
  }
}