import { NextResponse } from "next/server";
import Project from "../../../models/Project";
import dbConnect from "../../../utils/dbConnect";
import Joi from "joi";

let id_project = 7;

const projectSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  state: Joi.number().integer().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

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
  await dbConnect();

    // Validate the body using Joi
    const { error, value } = projectSchema.validate(body);
    if (error) {
        // Return a 400 response if validation fails
        return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

  try {
    const { name, description, state, tags } = value;
    const newProject = new Project({
      id: id_project,
      title: name,
      description: description,
      state,
      tags,
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