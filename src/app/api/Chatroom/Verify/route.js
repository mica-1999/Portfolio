import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
import dbConnect from "/src/utils/dbConnect";
import mongoose from "mongoose";
import { createHash } from "crypto";  // To hash user IDs

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const selectedUsers = JSON.parse(searchParams.get('selectedUsers')) || [];

    if (!selectedUsers) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    await dbConnect();

    try {
        let chatroomId;
        const sortedUsers = selectedUsers.sort();
        const userString = sortedUsers.join('-');


        const hash = createHash('sha256');
        hash.update(userString);
        chatroomId = hash.digest('hex').slice(0, 24);  // Return as a string 


        const chatroomExists = await Chatroom.findOne({ users: selectedUsers });

        if (chatroomExists) {
            console.log("Chatroom already exists for users");
            return NextResponse.json( chatroomExists.chatroomId );
        } else {
            console.log("Generating a new chatroom for users:", selectedUsers);
            return NextResponse.json( chatroomId ); 
        }
    } catch (error) {
        console.error("Error verifying chatroom:", error);
        return NextResponse.json({ error: 'Couldn\'t fetch chatroom' }, { status: 500 });
    }
}