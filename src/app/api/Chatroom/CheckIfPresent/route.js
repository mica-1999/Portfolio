import { NextResponse } from "next/server";
import Chatroom from "/src/models/Chatroom";
import dbConnect from "/src/utils/dbConnect";
import mongoose from "mongoose";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const currentUser = searchParams.get('currentUser');
    const userMapped = searchParams.get('userMapped');

    if (!currentUser || !userMapped) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    await dbConnect();

    try {
        const chatroomExists = await Chatroom.findOne({ users: { $all: [currentUser, userMapped] } });

        if (chatroomExists) {
            console.log("Chatroom already exists for users");
            return NextResponse.json({ roomExists: true });
        } else {
            console.log("Room doesn't exist for : ", currentUser, userMapped);
            return NextResponse.json({ roomExists: false });
        } 
    } catch (error) {
        console.error("Error verifying chatroom:", error);
        return NextResponse.json({ error: 'Couldn\'t fetch chatroom' }, { status: 500 });
    }
}