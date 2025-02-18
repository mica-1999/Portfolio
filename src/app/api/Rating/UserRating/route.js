import { NextResponse } from 'next/server';
import Rating from '/src/models/Rating';
import dbConnect from '/src/utils/dbConnect';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    await dbConnect();
    
    try {
        const getUserRating = await Rating.findOne({ userId });
        if(getUserRating === null){
            return NextResponse.json({ rating: 0 });
        }
        return NextResponse.json(getUserRating.rating);

    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Could not fetch rating data' }, { status: 500 });
    }
}