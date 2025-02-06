import { NextResponse } from "next/server";
import Project from "/src/models/Project";
import dbConnect from "/src/utils/dbConnect";

export async function GET() {
  await dbConnect();
  try {
    const projects_data = await Project.find();
    return NextResponse.json(projects_data);
  } catch (error) {
    return NextResponse.json({ error: 'Couldn\'t fetch projects data' }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  await dbConnect();

  // Manual validation
  const { projectName, projectDescription, selectedState, selectedTags } = body;

  // Check for missing fields
  if (!projectName || !projectDescription || !selectedState || !selectedTags) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Check if projectName and projectDescription are strings
  if (typeof projectName !== 'string' || projectName.trim() === '') {
    return NextResponse.json({ error: "Project name must be a non-empty string" }, { status: 400 });
  }
  
  if (typeof projectDescription !== 'string' || projectDescription.trim() === '') {
    return NextResponse.json({ error: "Project description must be a non-empty string" }, { status: 400 });
  }

  // Check if selectedState is a valid number
  const state = Number(selectedState);
  if (isNaN(state) || !Number.isInteger(state)) {
    return NextResponse.json({ error: "State must be an integer" }, { status: 400 });
  }

  // Check if selectedTags is an array of strings
  if (!Array.isArray(selectedTags) || !selectedTags.every(tag => typeof tag === 'string')) {
    return NextResponse.json({ error: "Tags must be an array of strings" }, { status: 400 });
  }

  try {
    // Create and save the new project
    const newProject = new Project({
      id: id_project,
      title: projectName,
      description: projectDescription,
      state,
      tags: selectedTags,
      lastUpdated: Date.now(),
      created: Date.now(),
      version: '1.0.0'
    });
    const project = await newProject.save();
    id_project += 1;
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json({ error: 'Couldn\'t create a new project' }, { status: 500 });
  }
}