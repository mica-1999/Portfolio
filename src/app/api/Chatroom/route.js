import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
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