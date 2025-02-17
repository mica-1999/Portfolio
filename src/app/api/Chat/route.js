import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
import Message from "/src/models/Message";
import dbConnect from "/src/utils/dbConnect";
import mongoose from 'mongoose';

// Function to fetch chatroom status
const checkChatroomExists = async (chatroomId, userId, selectedUsers, req) => {
  try {
    // Construct the full URL for the API endpoint
    const baseUrl = `${req.headers.get('origin')}`; // Get the base URL dynamically
    const url = `${baseUrl}/api/Chatroom?chatroomId=${chatroomId}&userId=${userId}&selectedUsers=${JSON.stringify(selectedUsers)}`;

    // Make the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch chatroom: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in checkChatroomExists:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatroomId');
  await dbConnect();
  try {
    const chatMsgs = await Message.find({ chatroomId: chatId });

    if (chatMsgs.length === 0) {
      console.log("No messages found");
      return NextResponse.json([]); // Empty array if no messages exist
    }
    
    return NextResponse.json(chatMsgs);
  } catch (error) {
      return NextResponse.json({error:'Couldnt fetch messages'},{status:500});
  }
}

export async function POST(req) {
  const body = await req.json();
  await dbConnect();

  const { message, userId, chatroomId, selectedUsers } = body;

  // Server-side validation
  if (!message || !userId || !chatroomId || !selectedUsers) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  } else if (message.length > 500) {
    return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
  }

  try {
    // Step 1: Check if the chatroom exists (and create if necessary)
    const chatroomResponse = await checkChatroomExists(chatroomId, userId, selectedUsers,req);

    // If the chatroom was created, the response will indicate that
    if (!chatroomResponse.exists) {
      console.log('Chatroom was created:', chatroomResponse.chatroom);
    } else {
      console.log('Chatroom exists:', chatroomResponse.chatroom);
    }

    // Step 2: Create the message
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
    console.error("Error saving message:", error);
    return NextResponse.json({ error: 'Couldn\'t store message' }, { status: 500 });
  }
}