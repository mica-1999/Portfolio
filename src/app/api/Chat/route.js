import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
import Message from "/src/models/Message";
import dbConnect from "/src/utils/dbConnect";
import mongoose from 'mongoose';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatroomId');
  await dbConnect();
  try {
    const chatMsgs = await Message.find({ chatroomId: chatId });

    if (chatMsgs.length === 0) {
      return NextResponse.json([]); // Empty array if no messages exist
    }
    
    return NextResponse.json(chatMsgs);
  } catch (error) {
      return NextResponse.json({error:'Couldnt fetch messages'},{status:500});
  }
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  await dbConnect();

  const { message, userId, chatroomId, selectedUsers } = body;
  // Server-side validation
  if (!message || !userId || !chatroomId || !selectedUsers) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  else if (message.length > 500) {
    return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
  }

  
  const chatroomExists = await Chatroom.findOne({chatroomId: chatroomId});
  if(!chatroomExists){
    const NewChatroom = new Chatroom({
          chatroomId: chatroomId,  // Unique identifier for the chatroom
          users: selectedUsers.includes(userId) ? [...selectedUsers] : [userId, ...selectedUsers],  // Array of User IDs (members)
          chatroomName: "Default Name",
          createdBy: new mongoose.Types.ObjectId(userId),  // The user who created the chatroom
    })
    const savedChatroom = await NewChatroom.save();
  }

  try {
    const newMessage = new Message({
        message: message,
        chatroomId: chatroomId,
        timestampMsg: Date.now(),
        file: "",
        sender: new mongoose.Types.ObjectId(userId),
    });
    const savedMessage = await newMessage.save();

    return NextResponse.json(savedMessage);
  } catch (error) {
    console.error("Error saving messafe:", error);
    return NextResponse.json({ error: 'Couldn\'t store message' }, { status: 500 });
  }
}