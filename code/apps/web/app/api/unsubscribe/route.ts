import { NextRequest, NextResponse } from "next/server";

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>Unsubscribe</title></head>
<body style="font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center;">
<h2 style="color:#dc2626;">Invalid unsubscribe link</h2>
<p>This link is missing a token. Please contact us at <a href="mailto:ghallman@aww.community">ghallman@aww.community</a> to unsubscribe.</p>
</body></html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    // Find subscriber by token
    const searchRes = await fetch(
      `${CMS_URL}/api/newsletter-subscribers?filters[unsubscribeToken][$eq]=${encodeURIComponent(token)}&pagination[pageSize]=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!searchRes.ok) throw new Error("Failed to look up subscriber");

    const json = await searchRes.json();
    const subscriber = json?.data?.[0];

    if (!subscriber) {
      return new NextResponse(
        `<!DOCTYPE html><html><head><title>Unsubscribe</title></head>
<body style="font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center;">
<h2 style="color:#6b7280;">Already unsubscribed</h2>
<p>You have already been removed from our mailing list.</p>
</body></html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    }

    // Mark as inactive
    const updateRes = await fetch(
      `${CMS_URL}/api/newsletter-subscribers/${subscriber.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            active: false,
            unsubscribedAt: new Date().toISOString(),
          },
        }),
      }
    );

    if (!updateRes.ok) throw new Error("Failed to unsubscribe");

    return new NextResponse(
      `<!DOCTYPE html><html><head><title>Unsubscribed</title></head>
<body style="font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center;">
<h2 style="color:#0a3680;">You've been unsubscribed</h2>
<p>You've been removed from the AWW Newsletter mailing list.</p>
<p style="margin-top:24px;"><a href="https://awomansworth.co" style="color:#0a3680;">Return to awomansworth.co</a></p>
</body></html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("[Unsubscribe]", err);
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>Error</title></head>
<body style="font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center;">
<h2 style="color:#dc2626;">Something went wrong</h2>
<p>Please contact us at <a href="mailto:ghallman@aww.community">ghallman@aww.community</a> to unsubscribe.</p>
</body></html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
