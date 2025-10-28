export const revalidate = 0;
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

type Blocks = any[] | null | undefined;

type Contact = {
  headline?: string | null;
  subheadline?: string | null;
  email?: string | null;
  phone?: string | null;
  addressBlocks?: Blocks;
  mapEmbed?: string | null;
};

function blocksToHTML(blocks: Blocks): string {
  if (!blocks?.length) return "";
  return blocks
    .map((b) => {
      const text = (b?.children ?? [])
        .map((c: any) => (typeof c?.text === "string" ? c.text : ""))
        .join("");
      if (!text) return "";
      return `<p>${text.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
}

function extractIframe(html: string): string | null {
  const m = html.match(/<iframe[\s\S]*?<\/iframe>/i);
  return m ? m[0] : null;
}

async function getContact(): Promise<Contact | null> {
  const res = await fetch(`${CMS_URL}/api/contact`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  const a = json?.data?.attributes ?? json?.data ?? {};
  return {
    headline: a?.headline ?? "Get in Touch",
    subheadline: a?.subheadline ?? "",
    email: a?.email ?? null,
    phone: a?.phone ?? null,
    addressBlocks: a?.address ?? null,
    mapEmbed: a?.mapEmbed ?? null,
  };
}

export default async function ContactPage() {
  const c = await getContact();

  const addressHTML = blocksToHTML(c?.addressBlocks);
  const iframeHTML = (c?.mapEmbed?.trim()?.length ? c?.mapEmbed : extractIframe(addressHTML || "")) || null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-[var(--aww-navy)] text-center">
        {c?.headline || "Contact Us"}
      </h1>
      {c?.subheadline ? <p className="mt-2 text-center text-neutral-600">{c.subheadline}</p> : null}

      <div className="mt-10 grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          {addressHTML ? (
            <div
              className="rounded-2xl border bg-white p-5 shadow prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: addressHTML }}
            />
          ) : null}

          <div className="rounded-2xl border bg-white p-5 shadow">
            {c?.email ? <div><strong>Email:</strong> {c.email}</div> : null}
            {c?.phone ? <div className="mt-1"><strong>Phone:</strong> {c.phone}</div> : null}

            {/* Socials (hardcoded like footer) */}
            <div className="mt-4 flex items-center gap-3">
              <a aria-label="Instagram" href="https://instagram.com" className="rounded-full grad-pill p-2 text-white" target="_blank" rel="noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a aria-label="Facebook" href="https://facebook.com" className="rounded-full grad-pill p-2 text-white" target="_blank" rel="noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a aria-label="LinkedIn" href="https://linkedin.com" className="rounded-full grad-pill p-2 text-white" target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
              <a aria-label="X (Twitter)" href="https://x.com" className="rounded-full grad-pill p-2 text-white" target="_blank" rel="noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-3 shadow">
          {iframeHTML ? (
            <div className="[&>*]:rounded-xl [&>*]:w-full [&>*]:h-[360px]" dangerouslySetInnerHTML={{ __html: iframeHTML }} />
          ) : (
            <div className="h-[360px] rounded-xl bg-neutral-100" />
          )}
        </div>
      </div>
    </main>
  );
}
