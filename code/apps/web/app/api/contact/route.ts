import { NextRequest, NextResponse } from 'next/server';

const CMS_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, inquiryType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const res = await fetch(`${CMS_URL}/api/contact-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        data: { name, email, subject, message, inquiryType: inquiryType || 'general' },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Strapi error:', text);
      return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
