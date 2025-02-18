import { NextResponse } from 'next/server';
import Rating from '/src/models/Rating';
import dbConnect from '/src/utils/dbConnect';

export async function GET() {
    await dbConnect();
    try {
        const lastYearDate = new Date();
        lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

        const ratings = await Rating.find({ createdAt: { $gte: lastYearDate } });

        const sumOfRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);

        return NextResponse.json(sumOfRatings);

    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Could not fetch rating data' }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const { userId, rating } = body;
        const findRating = await Rating.findOne({ userId: userId });

        if(findRating){
            const updatedRating = await Rating.findOneAndUpdate({ userId: userId }, { rating: rating });
            return NextResponse.json({ message: 'Rating updated sucessfully', updatedRating });
        }

        const newRating = new Rating({ userId, rating });
        await newRating.save();
        return NextResponse.json({ message: 'Rating created sucessfully' });

    } catch (error) {
        console.error('Error processing rating:', error);
        return NextResponse.json({ error: 'Could not process rating data' }, { status: 500 });
    }
}