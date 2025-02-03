import { NextResponse } from 'next/server';
import Bank from '../../../models/Bank';
import dbConnect from '../../../utils/dbConnect';

export async function GET(request) {
  await dbConnect();

  try {
    // Extract userId from query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const bankData = await Bank.findOne( {  userId } );

    if (!bankData) {
      return NextResponse.json({ error: 'No balance data found for this user' }, { status: 404 });
    }

    return NextResponse.json(bankData);
  } 
  catch (error) {
    console.error("Error fetching balance data:", error);
    return NextResponse.json({ error: 'Error fetching balance data' }, { status: 500 });
  }
}