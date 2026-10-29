"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import KingdomArtwork from "@/components/KingdomArtwork";
import { ArrowUpRight, Film, Play, X } from "lucide-react";

const recaps = [
  {
    id: "yjTzw_muhq8",
    label: "Day 01 · Recap",
    videoTitle: "Kandy Roar Day 1 recap",
    title: "Where the roar began.",
    description: "Step back into the first day of our last Kandy Roar.",
  },
  {
    id: "uNhxtxQkDzM",
    label: "Day 02 · Recap",
    videoTitle: "Kandy Roar Day 2 recap",
    title: "The memories live on.",
    description: "Relive the second day and the moments we carry with us.",
  },
  {
    id: "J0lJfWzkmEw",
    label: "Nova 25' · Awards Aftermovie",
    videoTitle: "Nova 25 awards ceremony aftermovie",
    title: "A night to remember. A legacy to celebrate.",
    description: "Revisit Nova 25' and celebrate the dedication, achievements, and people behind the applause.",
    featured: true,
  },
];

export default function RecapVideos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (activeVideo) playerRef.current?.focus();
  }, [activeVideo]);

  const closeVideo = (id: string) => {
    setActiveVideo(null);
    requestAnimationFrame(() => document.getElementById(`play-${id}`)?.focus());
  };

  return (
    <section id="recaps" aria-labelledby="recaps-heading" className="section-shell relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-12 top-24 h-64 rounded-full bg-[#750f24]/15 blur-3xl" />
      <div data-reveal className="page-reveal relative mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-4">
        <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37] sm:text-xs">
          <Film aria-hidden="true" className="h-4 w-4" />
          Moments that made us
        </p>
        <h2 id="recaps-heading" className="section-title text-[#f6eedb]">
          Relive the <span className="gold-text">Roar.</span>
        </h2>
        <p className="section-description text-[#f6eedb]/70">
          From the energy of our last Kandy Roar to the celebrations of Nova 25&apos;, revisit the moments that bring us together.
        </p>
        </div>
        <KingdomArtwork kind="elephant" className="h-28 w-40 self-center md:h-36 md:w-48" sizes="(min-width: 768px) 192px, 160px" />
      </div>

      <div className="relative grid gap-6 lg:grid-cols-2">
        {recaps.map((recap) => {
          const isPlaying = activeVideo === recap.id;
          return (
            <article key={recap.id} data-reveal className={`page-reveal overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-[#1c050b] shadow-[0_16px_50px_-24px_rgba(212,175,55,0.3)] sm:rounded-3xl ${recap.featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.2fr_1fr]" : ""}`}>
              <div className="relative aspect-video min-h-[200px] bg-black">
                {isPlaying ? (
                  <iframe
                    ref={playerRef}
                    title={recap.videoTitle}
                    src={`https://www.youtube-nocookie.com/embed/${recap.id}?autoplay=1&playsinline=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <button
                    id={`play-${recap.id}`}
                    type="button"
                    onClick={() => setActiveVideo(recap.id)}
                    aria-label={`Play ${recap.videoTitle}`}
                    className="group absolute inset-0 w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#fae19c]"
                  >
                    <Image
                      src={`https://i.ytimg.com/vi/${recap.id}/hqdefault.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 1152px) 532px, (min-width: 1024px) 50vw, 100vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#110609]/90 via-black/20 to-black/10" />
                    <span className="absolute left-4 top-4 rounded-full border border-[#fae19c]/40 bg-[#23040a]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#fae19c] sm:left-5 sm:top-5">{recap.label}</span>
                    <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#fae19c]/70 bg-[#d4af37] text-[#23040a] shadow-xl motion-safe:transition-transform motion-safe:group-hover:scale-110">
                      <Play className="ml-1 h-6 w-6 fill-current" />
                    </span>
                    <span className="absolute bottom-5 left-5 text-xs font-semibold tracking-wide text-[#fae19c]">Press play. Feel it again.</span>
                  </button>
                )}
              </div>
              <div className={`space-y-3 p-5 sm:p-6 ${recap.featured ? "lg:flex lg:flex-col lg:justify-center lg:p-8" : ""}`}>
                {recap.featured && <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">The awards. The applause. The memories.</p>}
                <h3 className="font-heading text-xl font-bold text-[#fae19c] sm:text-2xl">{recap.title}</h3>
                <p className="text-sm leading-relaxed text-[#f6eedb]/65">{recap.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d4af37]/15 pt-4">
                  <a href={`https://www.youtube.com/watch?v=${recap.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${recap.videoTitle} on YouTube (opens in a new tab)`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:text-[#fae19c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fae19c]">
                    Watch on YouTube <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                  {isPlaying && <button type="button" onClick={() => closeVideo(recap.id)} className="inline-flex items-center gap-1.5 text-xs text-[#f6eedb]/70 hover:text-[#fae19c]"><X aria-hidden="true" className="h-3.5 w-3.5" />Close video</button>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
