import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/app/context/CartContext";
import { CMS_URL as CMS_URL_FROM_LIB } from "@/lib/strapi";

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || CMS_URL_FROM_LIB || "http://localhost:1337";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Woman's Worth",
  description: "Empowering women through community, support, and transformative programs.",
};

type SiteSettings = {
  donationUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  footerDescription: string | null;
};

const defaultSiteSettings: SiteSettings = {
  donationUrl: null,
  facebookUrl: null,
  instagramUrl: null,
  linkedinUrl: null,
  twitterUrl: null,
  footerDescription: null,
};

async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${CMS_URL}/api/donation-links`, {
      next: { revalidate: 60 },
    });

    if (!res.ok){
      return defaultSiteSettings;
    }

    const json = await res.json();
    const first = json?.data?.[0];
    const data = first?.attributes ?? first;

    return{
      donationUrl: data?.donationUrl ?? null,
      facebookUrl: data?.facebookUrl ?? null,
      instagramUrl: data?.instagramUrl ?? null,
      linkedinUrl: data?.linkedinUrl ?? null,
      twitterUrl: data?.twitterUrl ?? null,
      footerDescription: data?.footerDescription ?? null,
    }
}catch {
    return defaultSiteSettings;
  }
}

async function getContact(): Promise<{
  email: string | null;
  phone: string | null;
  address: string | null;
}> {
  try {
    const res = await fetch(`${CMS_URL}/api/contact`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return { email: null, phone: null, address: null };
    }

    const json = await res.json();
    const data = json?.data?.attributes ?? json?.data;

    return {
      email: data?.email ?? null,
      phone: data?.phone ?? null,
      address: extractAddress(data?.address),
    };
  } catch {
    return { email: null, phone: null, address: null };
  }
}

function extractAddress(rich: any): string | null {
  if (!rich) return null;

  if (typeof rich === "string") return rich;

  const paragraph = rich.find((b: any) => b.type === "paragraph");
  return paragraph?.children?.map((c: any) => c.text).join(" ") ?? null;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [siteSettings, contact] = await Promise.all([getSiteSettings(), getContact(),]);
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navigation donationUrl={siteSettings.donationUrl} />
          {children}
          <SiteFooter 
            donationUrl={siteSettings.donationUrl}
            facebookUrl={siteSettings.facebookUrl}
            instagramUrl={siteSettings.instagramUrl}
            linkedinUrl={siteSettings.linkedinUrl}
            twitterUrl={siteSettings.twitterUrl}
            footerDescription={siteSettings.footerDescription}
            email={contact.email}
            phone={contact.phone}
            address={contact.address}
          />
        </CartProvider>
      </body>
    </html>
  );
}
