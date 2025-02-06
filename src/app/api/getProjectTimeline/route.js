import { NextResponse } from 'next/server';
import Project from '/src/models/Project';
import ProjectTimeline from '/src/models/Project-Timeline';
import dbConnect from '/src/utils/dbConnect';

export async function GET() {
    await dbConnect();
    try {
        const projectTimelines = await ProjectTimeline.find();
        const projects = await Project.find();

        // Merge the data from both collections
        const mergedData = projects.map(project => {
            // Ensure we're comparing the correct field
            const timeline = projectTimelines.filter(timeline => timeline.project.toString() === project._id.toString());
            return {
                ...project.toObject(),
                timeline
            };
        });

        return NextResponse.json(mergedData);

    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Could not fetch project data' }, { status: 500 });
    }
}
