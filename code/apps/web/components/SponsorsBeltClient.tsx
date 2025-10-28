"use client";

import { useMemo } from "react";

type Sponsor = { id: number; name?: string; logoUrl?: string; url?: string };

export default function SponsorsBeltClient({ sponsors }: { sponsors: Sponsor[] }) {
  const seq = useMemo(() => {
    if (!sponsors?.length) return [];
    return sponsors.map((s, i) => ({ ...s, _k: `s-${i}` }));
  }, [sponsors]);

  if (!seq.length) {
    return <div className="py-8 text-center text-neutral-400">Sponsor logos coming soon</div>;
  }

  const doubled = [...seq, ...seq];

  return (
    <div className="relative mt-3 overflow-hidden">
      <div
        className="inline-flex min-w-full items-center [animation:marquee_var(--speed)_linear_infinite]
                   hover:[animation-play-state:paused]"
        style={
          {
            ["--speed" as any]: "26s",
          } as React.CSSProperties
        }
      >
        {doubled.map((s, i) => (
          <a
            key={`${s._k}-${i}`}
            href={s.url || "#"}
            target="_blank"
            rel="noreferrer"
            className="
              mx-6 flex shrink-0 items-center justify-center
              h-[80px] w-[180px] md:h-[96px] md:w-[220px]
              rounded-xl bg-white/70 px-3 shadow-sm ring-1 ring-black/5
              transition hover:scale-[1.03]
            "
          >
            {s.logoUrl ? (
              <img
                src={s.logoUrl}
                alt={s.name || "Sponsor logo"}
                className="max-h-[60px] md:max-h-[72px] max-w-[11rem] object-contain mix-blend-multiply"
                loading="lazy"
              />
            ) : (
              <span className="text-xs text-neutral-500">{s.name}</span>
            )}
          </a>
        ))}
      </div>

      {/* scoped keyframes */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* slide exactly one half (the first copy) */
        }
      `}</style>
    </div>
  );
}
