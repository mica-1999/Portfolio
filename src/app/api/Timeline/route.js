import { NextResponse } from "next/server";
import Timeline from "../../../models/Timeline";
import dbConnect from "../../../utils/dbConnect";
import mongoose from "mongoose";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  // Validate the userId
  if (!userId) {
    return NextResponse.json({ error: 'Invalid or missing userId' }, { status: 400 });
  }
  await dbConnect();
  try {
      const timeline_data = await Timeline.findOne( { userId: new mongoose.Types.ObjectId(userId) } );
      if (!timeline_data) {
        console.warn(`No timeline found for userId: ${userId}`);
        return NextResponse.json([]); // ✅ This prevents the error
      }
      console.log("Timeline Data:", timeline_data.events);
      return NextResponse.json( timeline_data.events || [] );
  } catch (error) {
    console.error('Error fetching timeline data:', error);
      return NextResponse.json({error:'Couldnt fetch timeline data'},{status:500});
  }
}

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    await dbConnect();
  
    // Manual validation
    const { title, description, state } = body;
  
    // Check for missing fields
    if (!title || !description || !state) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
  
    // Check if title and description are strings
    if (typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: "Title must be a non-empty string" }, { status: 400 });
    }
    
    if (typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ error: "Description must be a non-empty string" }, { status: 400 });
    }
  
    // Check if state is a valid number
    const stateNumber = Number(state);
    if (isNaN(stateNumber) || !Number.isInteger(stateNumber)) {
      return NextResponse.json({ error: "State must be an integer" }, { status: 400 });
    }
  
    try {
      // Create and save the new timeline event
      const newTimelineEvent = new Timeline({
        title,
        description,
        state: stateNumber,
        lastEvent: Date.now()
      });
      const timelineEvent = await newTimelineEvent.save();
      return NextResponse.json(timelineEvent);
    } catch (error) {
      console.error("Error saving timeline event:", error);
      return NextResponse.json({ error: 'Couldn\'t create a new timeline event' }, { status: 500 });
    }
}