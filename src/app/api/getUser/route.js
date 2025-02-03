import { NextResponse } from "next/server";
import User from "/src/models/User";
import dbConnect from "/src/utils/dbConnect";

export async function GET() {
    await dbConnect();
    try {
        const user_data = await User.find();
        return NextResponse.json(user_data);
    } catch (error) {
        return NextResponse.json({error:'Couldnt fetch projects data'},{status:500});
    }
}