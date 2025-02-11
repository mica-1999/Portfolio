import { NextResponse } from "next/server";
import Project from "/src/models/Project";
import dbConnect from "/src/utils/dbConnect";
import mongoose from 'mongoose';

export async function GET() {
  await dbConnect();
  try {
    const projects_data = await Project.find();
    return NextResponse.json(projects_data);
  } catch (error) {
    return NextResponse.json({ error: 'Couldn\'t fetch projects data' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log(id);
  await dbConnect();
  try {
      const objectId = new mongoose.Types.ObjectId(id);
      const deleteProject = await Project.findOneAndDelete({ _id: objectId });
      if (!deleteProject) {
          return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
      return NextResponse.json({ error: 'Could not delete project' }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  await dbConnect();

  // Manual validation
  const { title, description, tags, state, version } = body;

  // Check for missing fields
  if (!title || !description || !tags || !state || !version) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Check if projectName and projectDescription are strings
  if (typeof title !== 'string' || title.trim() === '') {
    return NextResponse.json({ error: "Project name must be a non-empty string" }, { status: 400 });
  }
  
  if (typeof description !== 'string' || description.trim() === '') {
    return NextResponse.json({ error: "Project description must be a non-empty string" }, { status: 400 });
  }

  // Check if selectedTags is an array of strings
  if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
    return NextResponse.json({ error: "Tags must be an array of strings" }, { status: 400 });
  }

  try {
    // Create and save the new project
    const newProject = new Project({
      title: title,
      description: description,
      state: Number(state),
      tags: tags,
      lastUpdated: Date.now(),
      created: Date.now(),
      version: version
    });
    const project = await newProject.save();
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json({ error: 'Couldn\'t create a new project' }, { status: 500 });
  }
}

