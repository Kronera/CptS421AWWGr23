import { NextRequest, NextResponse } from 'next/server';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';
const CMS_TOKEN = process.env.STRAPI_API_TOKEN || '';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, subject, inquiryType, message } = body as Record<string, string>;

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: 'Name, email and message are required.' }, { status: 400 });
  }

  try {
    const res = await fetch(`${CMS_URL}/api/contact-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        data: { name, email, subject, inquiryType, message, read: false },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[contact] Strapi error:', err);
      return NextResponse.json({ success: false, message: 'Failed to save message.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('[contact] Network error:', err);
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
  }
}
