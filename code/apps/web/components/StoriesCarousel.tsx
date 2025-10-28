"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Story = {
  id: number;
  documentId?: string | null;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  coverFocalY?: "top" | "center" | "bottom";
};

const FALLBACK_STORY_IMG = "/branding/logo.png";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const mediaUrl = (path?: string | null) =>
  !path ? "" : path.startsWith("http") ? path : `${CMS_URL}${path}`;

function objectPosFromFocal(f?: "top" | "center" | "bottom") {
  return f === "top" ? "50% 0%" : f === "bottom" ? "50% 100%" : "50% 50%";
}

export default function StoriesCarousel({ stories }: { stories: Story[] }) {
  const [pageSize, setPageSize] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPageSize(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const pages = useMemo(() => {
    const out: Story[][] = [];
    for (let i = 0; i < stories.length; i += pageSize) {
      out.push(stories.slice(i, i + pageSize));
    }
    if (out.length === 0 && stories.length) out.push(stories.slice(0, pageSize));
    if (stories.length && (stories.length < pageSize)) {
      const need = pageSize - stories.length;
      out[0] = [...stories, ...stories.slice(0, need)];
    }
    return out;
  }, [stories, pageSize]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (pages.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % pages.length), 6000);
    return () => clearInterval(t);
  }, [pages.length]);

  if (!stories.length) return null;

  return (
    <div className="relative">
      {/* Slides */}
      <div className="relative overflow-hidden">
        {pages.map((group, i) => (
          <div
            key={i}
            className={`grid gap-6 transition-opacity duration-500 ${
              i === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
            } ${pageSize === 1 ? "grid-cols-1" : pageSize === 2 ? "md:grid-cols-2" : "lg:grid-cols-3"}`}
          >
            {group.map((s) => {
              const img = s.coverUrl ? mediaUrl(s.coverUrl) : FALLBACK_STORY_IMG;
              const objPos = objectPosFromFocal(s.coverFocalY);
              return (
                <Card
                  key={s.id}
                  className="group overflow-hidden rounded-2xl border-0 bg-white shadow transition hover:-translate-y-1 hover:shadow-xl reveal"
                >
                  <img
                    src={img}
                    alt={s.title}
                    style={{ objectPosition: objPos }}
                    className="h-90 w-98 object-full"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-neutral-900">{s.title}</h4>
                    {s.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-neutral-600">{s.excerpt}</p>
                    ) : null}
                    <a   href={`/stories/${encodeURIComponent((s.documentId || String(s.id)))}`} className="mt-4 inline-flex">
                      <Button
                        variant="outline"
                        className="btn-hover border-[#f7941D] text-[#f7941D] transition hover:bg-[#f7941D] hover:text-white"
                      >
                        Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        ))}
      </div>

      {/* Controls */}
      {pages.length > 1 && (
        <>
          <div className="mt-6 flex items-center justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  idx === i ? "bg-[#f7941D]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
