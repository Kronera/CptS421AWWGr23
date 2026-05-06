import Link from "next/link";
import { Building2, ExternalLink, Mail, Sparkles } from "lucide-react";
import { CMS_URL as CMS_URL_FROM_LIB } from "@/lib/strapi";
import { PartnershipsHero } from "@/components/PartnershipsHero";
import { PartnershipsPartnersSection } from "@/components/PartnershipsPartnersSection";

export const revalidate = 30;

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || CMS_URL_FROM_LIB || "http://localhost:1337";

type Partner = {
  id: number;
  name: string;
  url: string | null;
  logoUrl: string | null;
  blurb: string | null;
  partnerType: string | null;
  callout: string | null;
  featured: boolean;
  displayOrder: number;
};

type Sponsor = {
  id: number;
  name: string;
  url: string | null;
  logoUrl: string | null;
  blurb: string | null;
  sponsorType: string | null;
  callout: string | null;
  featured: boolean;
  displayOrder: number;
};

type ContactInfo = {
  email: string | null;
  phone?: string | null;
};

const mediaUrl = (p?: string | null) =>
  !p ? null : p.startsWith("http") ? p : `${CMS_URL}${p}`;

const pickImage = (img: any): string | null =>
  img?.url ||
  img?.data?.attributes?.url ||
  (Array.isArray(img?.data) ? img.data[0]?.attributes?.url : null) ||
  null;

function richTextToPlainText(value: any): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    const text = value
      .map((block: any) =>
        (block?.children ?? [])
          .map((child: any) => child?.text ?? "")
          .join("")
      )
      .join(" ")
      .trim();

    return text || null;
  }

  return null;
}

async function getContactInfo(): Promise<ContactInfo> {
  try {
    const res = await fetch(`${CMS_URL}/api/contact-info`, {
      next: { revalidate: 30 },
    });

    if (!res.ok) return { email: "ghallman@aww.community" };

    const json = await res.json();
    const a = json?.data?.attributes ?? json?.data ?? json;

    return {
      email: a?.email ?? a?.contactEmail ?? "ghallman@aww.community",
      phone: a?.phone ?? null,
    };
  } catch {
    return { email: "ghallman@aww.community" };
  }
}

async function getPartners(): Promise<Partner[]> {
  try {
    const url =
      `${CMS_URL}/api/partners?` +
      `populate=logo` +
      `&sort=displayOrder:asc` +
      `&pagination[pageSize]=100`;

    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return [];

    const rows: any[] = (await res.json())?.data ?? [];

    return rows.map((row) => {
      const a = row?.attributes ?? row;
      const img = pickImage(a?.logo);

      return {
        id: row.id ?? a.id,
        name: a?.name ?? "Partner",
        url: a?.url ?? null,
        logoUrl: img ? mediaUrl(img) : null,
        blurb: richTextToPlainText(a?.blurb),
        partnerType: a?.partnerType ?? null,
        callout: a?.callout ?? null,
        featured: a?.featured ?? false,
        displayOrder: a?.displayOrder ?? 0,
      };
    });
  } catch {
    return [];
  }
}

async function getSponsors(): Promise<Sponsor[]> {
  try {
    const url =
      `${CMS_URL}/api/sponsors?` +
      `populate=logo` +
      `&sort=displayOrder:asc` +
      `&pagination[pageSize]=100`;

    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return [];

    const rows: any[] = (await res.json())?.data ?? [];

    return rows.map((row) => {
      const a = row?.attributes ?? row;
      const img = pickImage(a?.logo);

      return {
        id: row.id ?? a.id,
        name: a?.name ?? "Sponsor",
        url: a?.url ?? null,
        logoUrl: img ? mediaUrl(img) : null,
        blurb: richTextToPlainText(a?.blurb),
        sponsorType: a?.sponsorType ?? null,
        callout: a?.callout ?? null,
        featured: a?.featured ?? false,
        displayOrder: a?.displayOrder ?? 0,
      };
    });
  } catch {
    return [];
  }
}

function GradientFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a3680] via-[#0d4ea6] to-[#f79520]">
      <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_30%,white,transparent_30%)]" />
      <Building2 className="relative z-10 h-10 w-10 text-white/85" />
    </div>
  );
}

function EntityCard({
  item,
  badge,
  featuredLabel,
}: {
  item: Partner | Sponsor;
  badge?: string | null;
  featuredLabel: string;
}) {
  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-orange-50/60 p-6">
        <div className="flex h-40 items-center justify-center rounded-2xl border border-black/5 bg-white/85 p-5 shadow-inner">
          {item.logoUrl ? (
            <img
              src={item.logoUrl}
              alt={`${item.name} logo`}
              className="h-full w-full object-contain scale-125 transition duration-300 group-hover:scale-105"
            />
          ) : (
            <GradientFallback />
          )}
        </div>

        {item.featured && (
          <span className="absolute right-5 top-5 rounded-full bg-[#f7941D] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {featuredLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {badge && (
            <span className="rounded-full bg-[#0a3680]/10 px-3 py-1 text-xs font-semibold text-[#0a3680]">
              {badge}
            </span>
          )}
        </div>

        <h2 className="text-xl font-extrabold text-neutral-950">{item.name}</h2>

        {item.callout && (
          <p className="mt-3 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-semibold italic leading-6 text-[#d56f00]">
            “{item.callout}”
          </p>
        )}

        {item.blurb && (
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-neutral-600">
            {item.blurb}
          </p>
        )}

        {item.url && (
          <div className="mt-auto pt-6">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#f7941D]">
              Visit Website
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </div>
        )}
      </div>
    </article>
  );

  if (!item.url) return card;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {card}
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold text-[#d56f00]">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </p>

      <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-600">
        {description}
      </p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-200 bg-white/80 py-16 text-center shadow-sm">
      <p className="text-neutral-500">{label}</p>
    </div>
  );
}

export default async function PartnershipsPage() {
  const [partners, sponsors, contactInfo] = await Promise.all([
    getPartners(),
    getSponsors(),
    getContactInfo(),
  ]);

  const orderedPartners = [
    ...partners.filter((p) => p.featured),
    ...partners.filter((p) => !p.featured),
  ];

  const orderedSponsors = [
    ...sponsors.filter((s) => s.featured),
    ...sponsors.filter((s) => !s.featured),
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50/50 via-white to-blue-50/40 text-[var(--aww-text)]">
      <PartnershipsHero />

      <PartnershipsPartnersSection partners={orderedPartners} />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Mission Sponsors"
          title="Sponsors"
          description="These sponsors invest in our work and help make our programs possible."
        />

        {orderedSponsors.length === 0 ? (
          <EmptyState label="Sponsor information will be added soon." />
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {orderedSponsors.map((sponsor) => (
              <EntityCard
                key={sponsor.id}
                item={sponsor}
                badge={sponsor.sponsorType}
                featuredLabel="Featured"
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#004080] via-[#0056b3] to-[#003066] p-8 text-center text-white shadow-2xl sm:p-12">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_30%),radial-gradient(circle_at_80%_80%,#f79520,transparent_35%)]" />

          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Interested in partnering?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85">
              Contact us to learn more about partnership opportunities and how your
              organization can support A Woman&apos;s Worth.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#f7941D] px-7 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e8830a]"
              >
                Contact Us
              </Link>

              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#004080]"
                >
                  <Mail className="h-4 w-4" />
                  Email AWW
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}