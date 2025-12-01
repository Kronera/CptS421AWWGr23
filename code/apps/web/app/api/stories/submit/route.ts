import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STRAPI_URL   = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const authorName = String(form.get("authorName") || "");
    const title      = String(form.get("title") || "");
    const body       = String(form.get("body") || "");
    const file       = form.get("image") as File | null;

    if (!title || !body) {
      return NextResponse.json({ ok: false, message: "Missing required fields." }, { status: 400 });
    }

    let coverId: number | null = null;
    if (file && typeof file === "object") {
      const fd = new FormData();
      fd.append("files", file, file.name || "upload.jpg");

      const up = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined,
        body: fd,
      });
      if (!up.ok) {
        const t = await up.text();
        return NextResponse.json({ ok: false, stage: "upload", message: t }, { status: 400 });
      }
      const j = await up.json();
      coverId = j?.[0]?.id ?? null;
    }


    const blocks = [{ type: "paragraph", children: [{ type: "text", text: body }] }];


    const payload = {
      data: {
        title,
        authorName: authorName || null,
        body: blocks,
        storyStatus: "pending",
        ...(coverId ? { cover: coverId } : {}),
      },
    };

    const create = await fetch(`${STRAPI_URL}/api/stories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!create.ok) {
      const t = await create.text();
      return NextResponse.json({ ok: false, message: `Create failed: ${t}` }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message || "Unknown error" }, { status: 500 });
  }
}
