import { NextResponse } from "next/server";
import Project from "../../../models/Project";
import dbConnect from "../../../utils/dbConnect";

export async function GET() {
    await dbConnect();
    try {
        const projects_data = await Project.find();
        return NextResponse.json(projects_data);
    } catch (error) {
        return NextResponse.json({error:'Couldnt fetch projects data'},{status:500});
    }
}