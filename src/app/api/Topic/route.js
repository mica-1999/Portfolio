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

export async function POST(req) {
  const body = await req.json();
  console.log("Received learning topic data:", body);
  await dbConnect();

  // Extract all required fields from the request body
  const { 
    titleCard, 
    subtitleCard, 
    category, 
    subcategory, 
    tags, 
    description, 
    state, 
    concepts, 
    videos,
    codeSnippets, 
    userNotes 
  } = body;

  // Manual validation - check for required fields
  if (!titleCard || !subtitleCard || !category || !subcategory || !description || !state) {
    return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
  }

  // Validate string fields
  if (typeof titleCard !== 'string' || titleCard.trim().length < 2) {
    return NextResponse.json({ error: "Title must be a string with at least 2 characters" }, { status: 400 });
  }
  
  if (typeof subtitleCard !== 'string' || subtitleCard.trim().length < 2) {
    return NextResponse.json({ error: "Subtitle must be a string with at least 2 characters" }, { status: 400 });
  }
  
  if (typeof description !== 'string' || description.trim().length < 10) {
    return NextResponse.json({ error: "Description must be a string with at least 10 characters" }, { status: 400 });
  }

  // Validate tags - convert string to array if needed
  let processedTags = tags;
  if (typeof tags === 'string') {
    processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  } else if (!Array.isArray(tags)) {
    return NextResponse.json({ error: "Tags must be a string or an array" }, { status: 400 });
  }

  if (processedTags.length < 1) {
    return NextResponse.json({ error: "At least one tag is required" }, { status: 400 });
  }

  // Validate state
  const validStates = ['Learned', 'Mastered', 'In Progress', 'Trying', 'Completed', 'On Hold', 'Abandoned'];
  if (!validStates.includes(state)) {
    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  }

  // Validate concepts if provided
  if (concepts && Array.isArray(concepts)) {
    for (let i = 0; i < concepts.length; i++) {
      const concept = concepts[i];
      if (!concept.title || typeof concept.title !== 'string' || concept.title.trim().length < 2) {
        return NextResponse.json(
          { error: `Concept #${i+1}: Title must be a string with at least 2 characters` }, 
          { status: 400 }
        );
      }
      
      if (!concept.explanation || typeof concept.explanation !== 'string' || concept.explanation.trim().length < 10) {
        return NextResponse.json(
          { error: `Concept #${i+1}: Explanation must be a string with at least 10 characters` }, 
          { status: 400 }
        );
      }
    }
  }

  // Validate code snippets if provided
  if (codeSnippets && Array.isArray(codeSnippets)) {
    for (let i = 0; i < codeSnippets.length; i++) {
      const snippet = codeSnippets[i];
      
      if (!snippet.language || typeof snippet.language !== 'string' || snippet.language.trim().length < 2) {
        return NextResponse.json(
          { error: `Code Snippet #${i+1}: Language must be a string with at least 2 characters` }, 
          { status: 400 }
        );
      }
      
      if (!snippet.code || typeof snippet.code !== 'string' || snippet.code.trim().length < 5) {
        return NextResponse.json(
          { error: `Code Snippet #${i+1}: Code must be a string with at least 5 characters` }, 
          { status: 400 }
        );
      }
      
      if (!snippet.explanation || typeof snippet.explanation !== 'string' || snippet.explanation.trim().length < 10) {
        return NextResponse.json(
          { error: `Code Snippet #${i+1}: Explanation must be a string with at least 10 characters` }, 
          { status: 400 }
        );
      }
    }
  }

  // Validate videos if provided
  if(videos && Array.isArray(videos)) {
    for(let i = 0; i < videos.length; i++) {
      const video = videos[i];
      
      if (!video.title || typeof video.title !== 'string' || video.title.trim().length < 2) {
        return NextResponse.json(
          { error: `Video #${i+1}: Title must be a string with at least 2 characters` }, 
          { status: 400 }
        );
      }
      
      if (!video.url || typeof video.url !== 'string' || video.url.trim().length < 5) {
        return NextResponse.json(
          { error: `Video #${i+1}: URL must be a string with at least 5 characters` }, 
          { status: 400 }
        );
      }
      
      if (!video.description || typeof video.description !== 'string' || video.description.trim().length < 10) {
        return NextResponse.json(
          { error: `Video #${i+1}: Description must be a string with at least 10 characters` }, 
          { status: 400 }
        );
      }
    }
  }

  // Validate user notes if provided
  if (userNotes && (typeof userNotes !== 'string' || userNotes.length > 300)) {
    return NextResponse.json({ error: "User notes must be a string with maximum 300 characters" }, { status: 400 });
  }

  try {
    // Create the new learning topic
    const newTopic = new learningSoftware({
      titleCard,
      subtitleCard,
      category,
      subcategory,
      tags: processedTags,
      description,
      state,
      concepts: concepts || [],
      codeSnippets: codeSnippets || [],
      videos: videos || [],
      userNotes: userNotes || '',
      dateCreated: Date.now(),
      lastUpdated: Date.now()
    });
    
    const savedTopic = await newTopic.save();
    console.log("Saved learning topic:", savedTopic._id);
    
    return NextResponse.json({
      success: true,
      message: "Learning topic created successfully",
      topic: savedTopic
    });
  } catch (error) {
    console.error("Error saving learning topic:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      
      return NextResponse.json({ 
        error: 'Validation error', 
        details: validationErrors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to create learning topic' }, { status: 500 });
  }
}