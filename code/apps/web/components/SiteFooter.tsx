import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-gradient-to-br from-[#0a3680] via-[#0d4ea6] to-[#f79520] text-white/95">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + Socials */}
          <div>
            {/* Logo (bigger per your request) */}
            <Link href="/" className="flex items-center gap-3">
            <Image
              src="/branding/logo-white.png"
              alt="A Woman's Worth"
              width={210}
              height={48}
              priority
              className="h-24 w-fit"
            />
            </Link>
            <p className="mt-3 text-white/80">
              Empowering women to recognize their inherent worth and embrace their unlimited potential
              through community support, mentorship, and shared stories of transformation.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                aria-label="Instagram"
                href="https://instagram.com"
                className="rounded-full grad-pill p-2 text-white transition"
                target="_blank" rel="noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                aria-label="Facebook"
                href="https://facebook.com"
                className="rounded-full grad-pill p-2 text-white transition"
                target="_blank" rel="noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com"
                className="rounded-full grad-pill p-2 text-white transition"
                target="_blank" rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                aria-label="X (Twitter)"
                href="https://x.com"
                className="rounded-full grad-pill p-2 text-white transition"
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
              <li><a href="/stories" className="hover:underline">Our Stories</a></li>
              <li><a href="/events" className="hover:underline">Upcoming Events</a></li>
              <li><a href="/donate" className="hover:underline">Make a Donation</a></li>
              <li><a href="/store" className="hover:underline">Support Store</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold">Get in Touch</div>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-90" />
                <a href="mailto:info@awomansworth.org" className="hover:underline">
                  info@awomansworth.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-90" />
                <span>(509) 290-7687</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 opacity-90" />
                <span>
                  59 E Queens Ave<br />Suite 210<br />Spokane, WA 99207
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} A Woman&apos;s Worth. All rights reserved.</span>
          <div className="space-x-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/accessibility" className="hover:underline">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
