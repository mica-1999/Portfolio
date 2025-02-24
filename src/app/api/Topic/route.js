import mongoose from "mongoose";
import { NextResponse } from "next/server";
import learningSoftware from "../../../models/LearningSoftware";


export async function GET() {
    try {
        const topics_data = await learningSoftware.find();
        return NextResponse.json(topics_data);
    } catch (error) {
        console.error('Error fetching topics:', error);
        return NextResponse.json({ error: "Couldn't fetch topics data" }, { status: 500 });
    }
}