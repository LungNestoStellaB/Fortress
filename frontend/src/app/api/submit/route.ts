import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, email, category } = body;

    if (!question || !email) {
      return NextResponse.json({ error: 'Question and email are required.' }, { status: 400 });
    }

    // 1. Log to Supabase
    const { data, error } = await supabase
      .from('questions')
      .insert([
        { 
          question, 
          email, 
          category, 
          status: 'received',
          created_at: new Date().toISOString()
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      // We'll continue even if DB fails to try email, but log it
    }

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: '"AskStella System" <StellaB@sestito.com>',
      to: 'just@askstella.online',
      subject: 'New Question Received on AskStella',
      text: `New question received:

Category: ${category || 'None'}
Email: ${email}

Question:
${question}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Question Received</h2>
          <p><strong>Category:</strong> ${category || 'None'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Question:</strong></p>
          <p style="background: #f4f4f4; padding: 15px;">${question}</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue to return success if DB worked
    }

    return NextResponse.json({ success: true, message: 'Question submitted successfully.' });

  } catch (err) {
    console.error('Submission error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
