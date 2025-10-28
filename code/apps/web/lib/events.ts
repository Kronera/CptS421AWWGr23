// apps/web/lib/events.ts
export const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

export type EventItem = {
  id: number;
  title: string;
  startDateTime: string | null;
  endDateTime?: string | null;
  location?: string | null;
  imageUrl?: string; // always set (default if missing)
  category?: string | null;
  featured?: boolean | null;
  rsvpEmail?: string | null;
};

const FALLBACK_STORY_IMG = "/branding/logo.png";

function mediaUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${CMS_URL}${path}`;
}

// Accept both { url } and { data: { attributes: { url } } }
function pickImageUrl(img: any): string | null {
  return img?.url || img?.data?.attributes?.url || null;
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    // No server-side date filter; we’ll filter on the app side.
    const res = await fetch(
      `${CMS_URL}/api/events?populate[image]=*&sort=startDateTime:asc&pagination[pageSize]=200`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const rows: any[] = json?.data || [];

    return rows.map((e) => {
      const a = e?.attributes ?? e;
      const img = pickImageUrl(a?.image);
      return {
        id: e?.id ?? a?.id ?? Math.random(),
        title: a?.title ?? "Event",
        startDateTime: a?.startDateTime ?? null,
        endDateTime: a?.endDateTime ?? null,
        location: a?.location ?? null,
        imageUrl: img ? mediaUrl(img) : FALLBACK_STORY_IMG,
        category: a?.category ?? null,
        featured: a?.featured ?? null,
        rsvpEmail: a?.rsvpEmail ?? null,
      };
    });
  } catch {
    return [];
  }
}
