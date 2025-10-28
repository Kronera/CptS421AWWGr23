import { Calendar as Cal, MapPin, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0;

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const FALLBACK_IMG = "/branding/logo.png";

// -- helpers ------------------------------------------------------------------
const mediaUrl = (p?: string | null) =>
  !p ? "" : p.startsWith("http") ? p : `${CMS_URL}${p}`;

const pickImageUrl = (img: any): string | null =>
  img?.url || img?.data?.attributes?.url || null;

function fmtDate(iso?: string | null) {
  if (!iso) return "TBA";
  try {
    const d = new Date(iso);
    return d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return "TBA";
  }
}

type EventData = {
  id: number;
  documentId?: string | null;
  title: string;
  startDateTime: string | null;
  endDateTime?: string | null;
  location?: string | null;
  imageUrl: string;
  category?: string | null;
  featured?: boolean | null;
  rsvpEmail?: string | null;
  summary?: any;
};

async function getEventByAnyId(idOrDocId: string): Promise<EventData | null> {
  const isNumeric = /^\d+$/.test(idOrDocId);

  const hitNumeric = async () => {
    const url = `${CMS_URL}/api/events/${idOrDocId}?populate=image`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const row = (await res.json())?.data;
    if (!row) return null;
    const a = row.attributes ?? row;
    const img = pickImageUrl(a?.image);
    return {
      id: row.id ?? a.id,
      documentId: row.documentId ?? a.documentId,
      title: a?.title ?? "Event",
      startDateTime: a?.startDateTime ?? null,
      endDateTime: a?.endDateTime ?? null,
      location: a?.location ?? null,
      imageUrl: img ? mediaUrl(img) : FALLBACK_IMG,
      category: a?.category ?? null,
      featured: a?.featured ?? null,
      rsvpEmail: a?.rsvpEmail ?? null,
      summary: a?.summary ?? null,
    } as EventData;
  };

  const hitDocumentId = async () => {
    const url = `${CMS_URL}/api/events?populate=image&filters[documentId][$eq]=${encodeURIComponent(
      idOrDocId
    )}&pagination[pageSize]=1`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const row = (await res.json())?.data?.[0];
    if (!row) return null;
    const a = row.attributes ?? row;
    const img = pickImageUrl(a?.image);
    return {
      id: row.id ?? a.id,
      documentId: row.documentId ?? a.documentId,
      title: a?.title ?? "Event",
      startDateTime: a?.startDateTime ?? null,
      endDateTime: a?.endDateTime ?? null,
      location: a?.location ?? null,
      imageUrl: img ? mediaUrl(img) : FALLBACK_IMG,
      category: a?.category ?? null,
      featured: a?.featured ?? null,
      rsvpEmail: a?.rsvpEmail ?? null,
      summary: a?.summary ?? null,
    } as EventData;
  };

  if (isNumeric) {
    const hit = await hitNumeric();
    if (hit) return hit;
    return await hitDocumentId();
  } else {
    return await hitDocumentId();
  }
}

// -- page ---------------------------------------------------------------------
export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getEventByAnyId(id);
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {/* header band */}
      <section
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{
          background:
            "linear-gradient(135deg,#0a3680 0%,#0d4ea6 55%,#f79520 100%)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">{data.title}</h1>
            <p className="mt-1 text-white/85">Details & information</p>
          </div>
          <a
            href="/events"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </a>
        </div>
      </section>

      {/* hero image with blurred backdrop */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 scale-110 blur-lg"
            style={{
              backgroundImage: `url(${data.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative h-64 sm:h-80 w-full bg-neutral-100">
            <img
              src={data.imageUrl || FALLBACK_IMG}
              alt={data.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-1 text-sm text-neutral-700">
            <div className="flex items-center gap-2">
              <Cal className="h-4 w-4" />
              {fmtDate(data.startDateTime)}
            </div>
            {data.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {data.location}
              </div>
            )}
          </div>

          {/* optional summary (Strapi rich text blocks, keep it simple) */}
          {Array.isArray(data.summary) && data.summary.length > 0 && (
            <div className="prose prose-neutral mt-6 max-w-none">
              {data.summary.map((block: any, i: number) => {
                const text =
                  block?.children?.map((c: any) => c?.text).join("") || "";
                return (
                  <p key={i} className="leading-relaxed">
                    {text}
                  </p>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-md bg-[var(--aww-orange,#f7941D)] px-4 py-2 text-white">
              Registration Coming Soon
            </span>
            <a
              href="/events"
              className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-neutral-50"
            >
              Back to Events
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
