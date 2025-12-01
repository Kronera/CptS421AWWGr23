import { Calendar as Cal, MapPin } from "lucide-react";

export const revalidate = 0;

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const FALLBACK_IMG = "/branding/logo.png";

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

type EventItem = {
  id: number;
  documentId?: string | null;
  title: string;
  startDateTime: string | null;
  location?: string | null;
  imageUrl: string;
  category?: string | null;
  featured?: boolean | null;
  rsvpEmail?: string | null;
};

async function getEvents(): Promise<EventItem[]> {
  const url = `${CMS_URL}/api/events?populate=image&sort=startDateTime:asc&pagination[pageSize]=200`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  const rows: any[] = json?.data || [];
  return rows.map((row) => {
    const a = row?.attributes ?? row;
    const img = pickImageUrl(a?.image);
    return {
      id: row?.id ?? a?.id,
      documentId: row?.documentId ?? a?.documentId,
      title: a?.title ?? "Event",
      startDateTime: a?.startDateTime ?? null,
      endDateTime: a?.endDateTime ?? null,
      location: a?.location ?? null,
      imageUrl: img ? mediaUrl(img) : FALLBACK_IMG,
      category: a?.category ?? null,
      featured: a?.featured ?? null,
      rsvpEmail: a?.rsvpEmail ?? null,
    };
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header band */}
      <section
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{
          background:
            "linear-gradient(135deg,#0a3680 0%,#0d4ea6 55%,#f79520 100%)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Upcoming Events</h1>
            <p className="mt-1 text-white/85">
              Join our community events designed to empower, educate, and
              connect.
            </p>
          </div>

          {/* simple tab pill – only List visible for now */}
          <div className="inline-flex rounded-full bg-white/15 p-1">
            <span className="rounded-full bg-white px-3 py-1 text-sm text-[var(--aww-navy,#0a3680)]">
              List
            </span>
          </div>
        </div>
      </section>

      {events.length === 0 ? (
        <p className="mt-6 text-neutral-500">No upcoming events.</p>
      ) : (
        <section className="mt-6 space-y-6">
          {events.map((ev) => (
            <article
              key={ev.id}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* 16:9 image with blurred backdrop so small images still feel full */}
              <div className="relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 scale-110 blur-lg"
                  style={{
                    backgroundImage: `url(${ev.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={ev.imageUrl || FALLBACK_IMG}
                    alt={ev.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold">{ev.title}</h2>
                  <div className="flex items-center gap-2">
                    {ev.featured ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        Featured
                      </span>
                    ) : null}
                    {ev.category ? (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        {ev.category}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-2 space-y-1 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Cal className="h-4 w-4" />
                    {fmtDate(ev.startDateTime)}
                  </div>
                  {ev.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {ev.location}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`/events/${encodeURIComponent((ev.documentId || ev.id).toString())}`}
                    className="inline-flex items-center rounded-md bg-[var(--aww-orange,#f7941D)] px-4 py-2 text-white transition hover:brightness-95"
                  >
                    Register Now
                  </a>
                  <a
                    href={`/events/${encodeURIComponent((ev.documentId || ev.id).toString())}`}
                    className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-neutral-50"
                  >
                    Details
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
