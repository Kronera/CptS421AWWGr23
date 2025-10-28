import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CMS_URL as CMS_URL_FROM_LIB } from "@/lib/strapi";
import HeroCarousel from "@/components/HeroCarousel";
import AboutBand from "@/components/AboutBand";
import CtaBand from "@/components/CtaBand";
import HomeClient from "@/components/HomeClient";
import StoriesCarousel from "@/components/StoriesCarousel";
import SponsorStatsStrip from "@/components/SponsorStatsStrip";


// ---------- helpers ----------
const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || CMS_URL_FROM_LIB || "http://localhost:1337";

function mediaUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${CMS_URL}${path}`;
}

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${CMS_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type StrapiImg =
  | { url?: string }
  | { data?: { attributes?: { url?: string } } }
  | null
  | undefined;

function pickImageUrl(img: StrapiImg): string {
  if (!img) return "";
  // @ts-ignore
  return img?.url || img?.data?.attributes?.url || "";
}

function textExcerpt(rich: any, max = 140): string {
  if (typeof rich === "string") return rich.slice(0, max);
  const para = Array.isArray(rich) ? rich.find((b) => b?.type === "paragraph") : null;
  const txt = para?.children?.map((c: any) => c?.text || "").join(" ") || "";
  return txt.slice(0, max);
}

// ---------- types ----------
type EventCard = {
  id: number;
  documentId?: string | null;
  title: string;
  startDateTime?: string;
  location?: string;
};

type StoryCard = {
  id: number;
  documentId?: string | null;
  title: string;
  coverUrl?: string;
  excerpt?: string;
  coverFocalY?: "top" | "center" | "bottom";
};

// ---------- data fetchers ----------
async function getStories(): Promise<StoryCard[]> {
  const res = await fetchJSON<any>(
    "/api/stories?filters[storyStatus][$eq]=approved&populate=cover&sort=publishedAt:desc&pagination[pageSize]=200"
  );
  const rows: any[] = (res && (Array.isArray(res) ? res : res.data)) || [];

  return rows.map((s: any) => {
    const a = s?.attributes ?? s;
    const title = a?.title ?? s?.title ?? "Untitled";
    const coverUrl = pickImageUrl(a?.cover ?? s?.cover);
    const excerpt = textExcerpt(a?.body ?? s?.body ?? "", 160);
    const coverFocalY = (a?.coverFocalY ?? s?.coverFocalY) as
      | "top"
      | "center"
      | "bottom"
      | undefined;

    return {
      id: s?.id ?? a?.id ?? Math.random(),
      documentId: a?.documentId ?? a?.documentId ?? null,
      title,
      coverUrl,
      excerpt,
      coverFocalY,
    };
  });
}

// app/page.tsx (getEvents)
async function getEvents(): Promise<EventCard[]> {
  const now = new Date().toISOString();
  const res = await fetchJSON<any>(
    `/api/events?filters[startDateTime][$gte]=${encodeURIComponent(
      now
    )}&sort=startDateTime:asc&pagination[pageSize]=2`
  );
  const rows: any[] = (res && (Array.isArray(res) ? res : res.data)) || [];

  return rows.map((e: any) => {
    const a = e?.attributes ?? e;
    return {
      id: e?.id ?? a?.id ?? Math.random(),
      documentId: e?.documentId ?? a?.documentId,
      title: a?.title ?? "Event",
      startDateTime: a?.startDateTime,
      location: a?.location,
    };
  });
}


// ---------- page ----------
export default async function HomePage() {
  const [stories, events] = await Promise.all([getStories(), getEvents()]);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO (CMS-managed slides) */}
      <HeroCarousel />

      {/* Client-only wrapper to trigger .reveal fade-ins */}
      <HomeClient>
        {/* ABOUT BAND */}
        <AboutBand />
        <SponsorStatsStrip />

        {/* FEATURED STORIES (auto-cycling) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8 reveal">
            <h3 className="text-3xl font-extrabold">Featured Stories</h3>
            <p className="mt-2 text-neutral-600">
              Real women, real transformations. Discover the inspiring journeys of our community members.
            </p>
          </div>

          {stories.length === 0 ? (
            <p className="text-center text-neutral-500 reveal">Stories coming soon.</p>
          ) : (
            <StoriesCarousel stories={stories} />
          )}
        </section>

        {/* UPCOMING EVENTS */}
        <section className="-mx-4 bg-neutral-50 px-4 py-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-8 reveal">
              <h3 className="text-3xl font-extrabold">Upcoming Events</h3>
              <p className="mt-2 text-neutral-600">
                Join us for inspiring events that bring our community together.
              </p>
            </div>

            {events.length === 0 ? (
              <p className="text-center text-neutral-500 reveal">Events coming soon.</p>
            ) : (
              <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                {events.map((ev) => {
                  const d = ev.startDateTime ? new Date(ev.startDateTime) : null;
                  const month = d
                    ? d.toLocaleString("en-US", { month: "short" }).toUpperCase()
                    : "";
                  const day = d ? d.getDate() : "";
                  const time = d
                    ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
                    : "";

                  return (
                    <Card
                      key={ev.id}
                      className="flex items-start gap-4 rounded-2xl border-0 bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl reveal"
                    >
                      <div className="rounded-lg bg-[#f7941D] px-3 py-2 text-center text-white">
                        <div className="text-xs font-medium">{month}</div>
                        <div className="text-2xl font-bold leading-tight">{day}</div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-neutral-900">
                          {ev.title}
                        </h4>

                        <div className="mt-2 flex items-center text-neutral-600">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{time || "TBA"}</span>
                        </div>

                        {ev.location ? (
                          <div className="mt-1 flex items-center text-neutral-600">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{ev.location}</span>
                          </div>
                        ) : null}

                        <a href={`/events/${encodeURIComponent((ev.documentId || ev.id).toString())}`} className="mt-4 inline-flex">
                          <Button className="bg-[#f7941D] text-white transition hover:bg-[#e08311]">
                            Go to events
                          </Button>
                        </a>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA STRIP */}
        <CtaBand />
      </HomeClient>
    </main>
  );
}
