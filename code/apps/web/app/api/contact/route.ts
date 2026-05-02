import { NextRequest, NextResponse } from 'next/server';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(req: NextRequest) {
  if (!CMS_URL) {
    return NextResponse.json({ error: 'CMS_URL not configured.' }, { status: 500 });
  }
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
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Contact route error:', msg);
    return NextResponse.json({ error: `Failed to reach CMS: ${msg}` }, { status: 500 });
  }
}
