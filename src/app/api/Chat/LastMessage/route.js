import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
import Message from "/src/models/Message";
import dbConnect from "/src/utils/dbConnect";
import mongoose from 'mongoose';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatroomId');
  const selectedUsers = searchParams.get('selectedUsers');
  await dbConnect();
  try {
    const chatMsgs = await Message.findOne({ chatroomId: chatId }).sort({ timestamp: -1 }).limit(1);

    if (chatMsgs.length === 0) {
        console.log("No messages found");
        return NextResponse.json([]);
    }
    
    return NextResponse.json(chatMsgs);
  } catch (error) {
    return NextResponse.json([]);
  }
}