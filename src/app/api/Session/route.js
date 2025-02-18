import { NextResponse } from 'next/server';
import Session from '/src/models/Session';
import dbConnect from '/src/utils/dbConnect';

export async function GET() {
    await dbConnect();
    try {
        // Get the date for 1 month ago
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        
        const sessions = await Session.find();

        if(!sessions) {
            return NextResponse.json({ error: 'No sessions found' }, { status: 404 });
        }
        let count = 0;
        sessions.forEach((session) => {
            session.timestamps.forEach((timestamp) => {
                if(timestamp > lastMonthDate) {
                    count++;
                }
            })
        })

        return NextResponse.json(count);

    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Could not fetch project data' }, { status: 500 });
    }
}
