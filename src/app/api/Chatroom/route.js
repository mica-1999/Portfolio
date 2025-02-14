import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
import dbConnect from "/src/utils/dbConnect";
import mongoose from "mongoose";

// Check if the chatroom exists and create it if not
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const chatroomId = searchParams.get('chatroomId');  // Get chatroomId from query params
    const userId = searchParams.get('userId'); // Assuming you pass the userId in the query as well
    const selectedUsers = searchParams.get('selectedUsers') ? JSON.parse(searchParams.get('selectedUsers')) : [];

    // Ensure the chatroomId is present
    if (!chatroomId || !userId || !selectedUsers) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    await dbConnect();

    try {
        const chatroomExists = await Chatroom.findOne({ chatroomId: chatroomId });

        if (!chatroomExists) {
            const newChatroom = new Chatroom({
                chatroomId: chatroomId,
                users: selectedUsers.includes(userId) ? [...selectedUsers] : [userId, ...selectedUsers],
                chatroomName: "Default Name", 
                createdBy: new mongoose.Types.ObjectId(userId), 
            });

            const savedChatroom = await newChatroom.save();

            return NextResponse.json({ exists: false, chatroom: savedChatroom });
        }

        // If the chatroom exists, return it
        return NextResponse.json({ exists: true, chatroom: chatroomExists });
    } catch (error) {
        console.error("Error fetching or creating chatroom:", error);
        return NextResponse.json({ error: 'Couldn\'t fetch or create chatroom' }, { status: 500 });
    }
}
