import { NextResponse } from 'next/server';
import Bank from '../../../models/Bank';
import dbConnect from '../../../utils/dbConnect';

export async function GET(request) {
  await dbConnect();

  try {
  // Extract userId from query parameters
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const bankData = await Bank.findOne( {  userId } );
  return NextResponse.json(bankData);
  } 
  catch (error) {
    return NextResponse.json({ error: 'Error fetching balance data' }, { status: 500 });
  }
}
