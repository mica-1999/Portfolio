import { NextResponse } from "next/server";
import Timeline from "../../../models/Timeline";
import dbConnect from "../../../utils/dbConnect";

export async function GET() {
    await dbConnect();
    try {
        const timeline_data = await Timeline.find();
        return NextResponse.json(timeline_data);
    } catch (error) {
        return NextResponse.json({error:'Couldnt fetch projects data'},{status:500});
    }
}