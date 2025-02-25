import { NextResponse } from "next/server";
import learningSoftware from "../../../models/LearningSoftware";
import dbConnect from "../../../utils/dbConnect";


export async function GET() {
    try {
        await dbConnect();
        const topics_data = await learningSoftware.find();
        console.log(topics_data)
        return NextResponse.json(topics_data);
    } catch (error) {
        console.error('Error fetching topics:', error);
        return NextResponse.json({ error: "Couldn't fetch topics data" }, { status: 500 });
    }
}