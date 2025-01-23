import { NextResponse } from 'next/server';
import Bank from '../../../models/Bank';
import dbConnect from '../../../utils/dbConnect';

export async function GET() {
  await dbConnect();

  try {
    const bankData = await Bank.findOne();
    return NextResponse.json(bankData);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching balance data' }, { status: 500 });
  }
}
