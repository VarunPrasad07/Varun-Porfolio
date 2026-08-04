import { NextResponse } from 'next/server';

const FORM_ID = process.env.GOOGLE_FORM_ID || '';
const ENTRY_NAME = process.env.GOOGLE_FORM_ENTRY_NAME || '';
const ENTRY_EMAIL = process.env.GOOGLE_FORM_ENTRY_EMAIL || '';
const ENTRY_MESSAGE = process.env.GOOGLE_FORM_ENTRY_MESSAGE || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    if (!FORM_ID || !ENTRY_NAME || !ENTRY_EMAIL || !ENTRY_MESSAGE) {
      return NextResponse.json({
        success: false,
        message: 'Google Form is not configured. Add GOOGLE_FORM_ID and entry IDs to .env.local',
      }, { status: 200 });
    }

    const formData = new URLSearchParams();
    formData.append(ENTRY_NAME, name);
    formData.append(ENTRY_EMAIL, email);
    formData.append(ENTRY_MESSAGE, message);

    const res = await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    if (!res.ok) {
      return NextResponse.json({
        success: false,
        message: `Google Form rejected the submission (status ${res.status}). Make sure the form is open to everyone.`,
      }, { status: 200 });
    }

    console.log(`[Contact] Submitted to Google Form ${FORM_ID} from ${email}`);
    return NextResponse.json({
      success: true,
      message: 'Submission recorded in Google Form!',
    });
  } catch (error) {
    console.error('[API Contact Error]', error);
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({
      success: false,
      message,
    }, { status: 200 });
  }
}
