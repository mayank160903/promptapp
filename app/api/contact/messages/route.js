import { NextResponse } from 'next/server';
import Contact from '@models/Contact';
import { connectToDB } from '@utils/database';

export async function GET() {
  try {
    await connectToDB();
    const messages = await Contact.find(); // Fetch all messages from the database

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch messages' }, { status: 500 });
  }
}