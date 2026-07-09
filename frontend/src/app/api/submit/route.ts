import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, email, category } = body;

    if (!question || !email) {
      return NextResponse.json({ error: 'Question and email are required.' }, { status: 400 });
    }

    // Since Supabase is paused and email is unneeded right now,
    // we just mock a successful response.
    console.log('Received submission (mocked):', { email, category, question });

    return NextResponse.json({ success: true, message: 'Question submitted successfully (mocked).' });

  } catch (err) {
    console.error('Submission error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
