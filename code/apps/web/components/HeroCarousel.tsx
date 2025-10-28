"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Slide = {
  src: string;
  focalX: "left" | "center" | "right";
  focalY: "top" | "center" | "bottom";
  fit: "cover" | "contain";
};

const FALLBACK: Slide[] = [
  { src: "/hero/slide-1.jpeg", focalX: "center", focalY: "center", fit: "cover" },
  { src: "/hero/slide-2.jpeg", focalX: "center", focalY: "center", fit: "cover" },
  { src: "/hero/slide-3.jpeg", focalX: "center", focalY: "center", fit: "cover" },
];

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const HEADLINE = "Refuse to Miss";
const SUBHEAD  = "Your Blessings";
const OVERLAY  = 0.32;

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(FALLBACK);


  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);


  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${CMS_URL}/api/hero-slides?populate=image&sort=createdAt:asc`, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        const rows: any[] = Array.isArray(json) ? json : json?.data || [];

        const mapped: Slide[] = rows
          .map((node: any) => node?.attributes ?? node)
          .map((a: any) => {
            let raw = "";
            if (a?.image?.url) raw = a.image.url;
            else if (a?.image?.data?.attributes?.url) raw = a.image.data.attributes.url;
            else if (Array.isArray(a?.image?.data) && a.image.data[0]?.attributes?.url) raw = a.image.data[0].attributes.url;

            const src = raw ? (raw.startsWith("http") ? raw : `${CMS_URL}${raw}`) : "";

            const focalX = (a?.focalX ?? a?.FocalX ?? "center") as Slide["focalX"];
            const focalY = (a?.focalY ?? a?.FocalY ?? "center") as Slide["focalY"];
            const fit = (a?.fit ?? a?.Fit ?? "cover") as Slide["fit"];

            return src
              ? { src, focalX, focalY, fit }
              : null;
          })
          .filter(Boolean) as Slide[];

        if (!cancelled && mapped.length) setSlides(mapped);
      } catch {
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const current = useMemo(() => slides[i], [slides, i]);

  const objectPos =
    `${current.focalX === "left" ? "0%" : current.focalX === "right" ? "100%" : "50%"} ` +
    `${current.focalY === "top" ? "0%" : current.focalY === "bottom" ? "100%" : "50%"}`;

  const overlayAlpha = Math.min(Math.max(OVERLAY, 0), 0.9);

  return (
    <section className="relative h-[58vh] md:h-[70vh] overflow-hidden">
      {slides.map((s, idx) => (
        <img
          key={`${s.src}-${idx}`}
          src={s.src}
          alt=""
          style={{ objectPosition: objectPos }}
          className={[
            "absolute inset-0 w-full h-full transition-opacity duration-600",
            s.fit === "contain" ? "object-contain bg-black" : "object-cover",
            idx === i ? "opacity-100" : "opacity-0"
          ].join(" ")}
        />
      ))}

      {/* readability overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,${overlayAlpha}) 0%, rgba(0,0,0,${overlayAlpha * 0.65}) 45%, rgba(0,0,0,${overlayAlpha * 0.35}) 70%, rgba(0,0,0,0) 100%),
            linear-gradient(180deg, rgba(0,0,0,${overlayAlpha * 0.7}) 0%, rgba(0,0,0,${overlayAlpha}) 60%, rgba(0,0,0,${overlayAlpha * 0.8}) 100%)
          `,
          mixBlendMode: "multiply",
        }}
      />

      {/* content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]">
            {HEADLINE}<br /><span className="text-[#ffefc2]">{SUBHEAD}</span>
          </h1>
          <p className="mt-5 text-base md:text-xl text-white/90 max-w-3xl mx-auto">
            Empowering women to recognize their worth, embrace their potential, and create lasting change through community support and shared stories.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="inline-flex items-center justify-center rounded-md bg-[var(--aww-navy)] px-6 py-3 text-white btn-hover">
              Make a Donation
            </Link>
            <Link href="/stories" className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-white hover:bg-white hover:text-[var(--aww-navy)] transition">
              Read Our Stories
            </Link>
          </div>

          {/* dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-2.5 w-2.5 rounded-full transition ${i === idx ? "bg-white" : "bg-white/40"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
