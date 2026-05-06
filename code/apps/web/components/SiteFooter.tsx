import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SiteFooterProps = {
  donationUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  footerDescription?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

export default function SiteFooter({ 
  donationUrl,
  facebookUrl,
  instagramUrl,
  linkedinUrl,
  twitterUrl,
  footerDescription,
  email,
  phone,
  address,
}: SiteFooterProps) {
  const FALLBACK_DONATION_URL = "https://www.paypal.com/donate/?hosted_button_id=4HQXUB47ZQSUG";

function safeExternalUrl(url?: string | null) {
  if (!url) return FALLBACK_DONATION_URL;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.toString();
    }
  } catch {}
  return FALLBACK_DONATION_URL;
}

const finalDonationUrl = safeExternalUrl(donationUrl);
  return (
    <footer className="mt-16 bg-gradient-to-br from-[#0a3680] via-[#0d4ea6] to-[#f79520] text-white/95">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + Socials */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
            <Image
              src="/branding/logo-white.png"
              alt="A Woman's Worth"
              width={210}
              height={48}
              priority
              className="h-20 sm:h-24 w-fit"
            />
            </Link>
            <p className="mt-3 text-white/80">
              { footerDescription || "Empowering women to recognize their inherent worth and embrace their unlimited potential through community support, mentorship, and shared stories of transformation."}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                aria-label="Facebook"
                href={facebookUrl || "https://www.facebook.com/profile.php?id=100089752024921"}
                className="w-11 h-11 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                target="_blank" rel="noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                aria-label="Instagram"
                href={instagramUrl || "https://www.instagram.com/awomans_worth/"}
                className="w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                target="_blank" rel="noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                aria-label="LinkedIn"
                href={linkedinUrl || "https://linkedin.com"}
                className="w-11 h-11 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                target="_blank" rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                aria-label="X (Twitter)"
                href={twitterUrl || "https://x.com"}
                className="w-11 h-11 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                target="_blank" rel="noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold">Quick Links</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="/stories" className="hover:underline underline-offset-4">Our Stories</Link></li>
              <li><Link href="/events" className="hover:underline underline-offset-4">Upcoming Events</Link></li>
              <li><a href={finalDonationUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">Make a Donation</a></li>
              <li><Link href="/store" className="hover:underline underline-offset-4">Support Store</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold">Get in Touch</div>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-90" />
                <a href={`mailto:${email || "ghallman@aww.community"}`} className="hover:underline">
                  {email || "ghallman@aww.community"}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-90" />
                <span>{phone || "509-385-7074"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-90" />
                <span>509-290-7687 (leave msg for appt)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 opacity-90" />
                <span>
                  {address || "327 E Pacific St. (office visit only)"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} A Woman&apos;s Worth. All rights reserved.</span>
          <div className="space-x-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/accessibility" className="hover:underline">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
