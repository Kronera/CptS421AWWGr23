"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/events", label: "Events" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname() || "/";

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/branding/logo.png"
            alt="A Woman's Worth"
            width={210}
            height={48}
            priority
            className="h-auto w-auto relative top-5"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {nav.map((n) => {
            const isActive =
              n.href === "/"
                ? pathname === "/"
                : pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-[17px] font-medium transition
                  ${isActive ? "text-[var(--aww-orange)]" : "text-gray-700 hover:text-[var(--aww-orange)]"}
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[var(--aww-orange)]
                  ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"} after:transition-all after:duration-200`}
              >
                {n.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center">
          <Link
            href="/donate"
            className="btn-pill bg-[var(--aww-navy)] text-white px-4 py-2 text-sm hover:bg-[#003366]"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
