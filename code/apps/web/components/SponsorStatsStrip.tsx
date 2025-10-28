import SponsorsBeltClient from "./SponsorsBeltClient";
import { CMS_URL as CMS_URL_FROM_LIB } from "@/lib/strapi";

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || CMS_URL_FROM_LIB || "http://localhost:1337";

const mediaUrl = (p?: string) =>
  !p ? "" : p.startsWith("http") ? p : `${CMS_URL}${p}`;

type Sponsor = { id: number; name?: string; logoUrl?: string; url?: string };

async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const url =
      `${CMS_URL}/api/sponsors` +
      `?populate[logo][fields][0]=url` +
      `&filters[active][$eq]=true` +
      `&sort=displayOrder:asc` +
      `&pagination[pageSize]=100`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const rows: any[] = (await res.json())?.data || [];

    return rows.map((r: any) => {
      const a = r?.attributes ?? r;
      const logo =
        a?.logo?.data?.attributes?.url ||
        a?.logo?.url ||
        "";

      return {
        id: r?.id ?? a?.id ?? Math.random(),
        name: a?.name,
        url: a?.url || "#",
        logoUrl: logo ? mediaUrl(logo) : "",
      };
    });
  } catch {
    return [];
  }
}

export default async function SponsorStatsStrip() {
  const sponsors = await fetchSponsors();

  return (
    <section className="relative py-14 overflow-hidden">
      {/* gradient glows */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(closest-side, rgba(247,148,29,.35), transparent)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(closest-side, rgba(0,64,128,.35), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Women served", value: "1,200+" },
            { label: "Coats donated", value: "450+" },
            { label: "Events hosted", value: "85+" },
            { label: "Years active", value: "5+" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--aww-border)] bg-white/80 p-6 text-center shadow-sm backdrop-blur"
            >
              <div className="text-3xl font-extrabold text-[var(--aww-navy)]">{s.value}</div>
              <div className="mt-1 text-sm text-neutral-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sponsors belt */}
        <div className="mt-10 rounded-2xl border border-[var(--aww-border)] bg-white/70 px-2 py-4 backdrop-blur">
          <div className="text-center text-sm font-medium text-neutral-600">Supported by</div>
          <SponsorsBeltClient sponsors={sponsors} />
        </div>
      </div>
    </section>
  );
}
