"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import groupPhoto from "../../public/images/group image.jpg";
import ebPhoto from "../../public/images/eb image.jpg";
import memberPhoto from "../../public/images/member image.jpg";

const stories = {
  group: {
    image: groupPhoto,
    label: "The Kandy Roar spirit",
    title: "One family. One mighty roar.",
    description: "Shared moments. Lasting friendships. A legacy we carry forward together.",
    alt: "Kandy Roar delegates and organizers gathered for a group photograph",
  },
  eb: {
    image: ebPhoto,
    label: "Our Executive Board",
    title: "Together, we lead.",
    description: "United by purpose, connected by the courage to make a difference.",
    alt: "AIESEC Executive Board members standing together with arms around one another",
  },
  members: {
    image: memberPhoto,
    label: "Our members",
    title: "The people behind the roar.",
    description: "Every connection is the beginning of something extraordinary.",
    alt: "Kandy Roar members sharing a moment of togetherness during a session",
  },
} satisfies Record<string, {
  image: StaticImageData; label: string; title: string;
  description: string; alt: string;
}>;

export function TogetherWeRoar() {
  const followCursor = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const frame = event.currentTarget;
    const bounds = frame.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    frame.style.setProperty("--photo-tilt-x", `${-y * 4}deg`);
    frame.style.setProperty("--photo-tilt-y", `${x * 4}deg`);
  };

  const resetPhoto = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty("--photo-tilt-x");
    event.currentTarget.style.removeProperty("--photo-tilt-y");
  };

  return (
    <section aria-labelledby="together-we-roar" className="section-shell relative">
      <div className="mb-7 text-center">
        <h2 id="together-we-roar" className="section-title text-[#fae19c]">Together we Roar</h2>
        <p className="section-description mx-auto mt-3 max-w-2xl text-[#f6eedb]/70">
          United by purpose. Connected by the people who make every roar possible.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2">
        {(["eb", "members"] as const).map(kind => (
          <div key={kind} data-reveal onPointerMove={followCursor} onPointerLeave={resetPhoto} onPointerCancel={resetPhoto} className="together-photo page-reveal mx-auto w-full max-w-lg">
          <figure className="together-photo-frame relative rounded-2xl border border-[#d4af37]/40 bg-[#23040a] p-2 shadow-[0_16px_60px_-20px_rgba(212,175,55,0.25)] sm:p-3">
            <Image
              src={stories[kind].image}
              alt={stories[kind].alt}
              sizes="(min-width: 768px) 488px, (min-width: 544px) 488px, calc(100vw - 56px)"
              placeholder="blur"
              className="h-auto w-full rounded-xl"
            />
          </figure>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CommunityPhoto({ kind }: { kind: keyof typeof stories }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const story = stories[kind];

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    const update = () => {
      animationFrame = 0;
      if (motionPreference.matches) {
        frame.style.removeProperty("--photo-drift");
        frame.style.removeProperty("--photo-scale");
        return;
      }
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      // Use the untransformed frame position so scaling cannot feed back into its measurement.
      const frameCenter = bounds.top + frame.offsetTop + frame.offsetHeight / 2;
      const progress = (window.innerHeight / 2 - frameCenter) /
        ((window.innerHeight + frame.offsetHeight) / 2);
      const distance = Math.min(1, Math.abs(progress));
      const prominence = (1 - distance * distance) ** 2;
      frame.style.setProperty("--photo-drift", `${Math.max(-1, Math.min(1, progress)) * -22}px`);
      frame.style.setProperty("--photo-scale", `${0.94 + prominence * 0.075}`);
    };
    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    motionPreference.addEventListener("change", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motionPreference.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.remove("community-photo-pending");
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    section.classList.add("community-photo-pending");
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby={`community-${kind}`} className="community-photo section-shell relative">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          {kind === "group" && <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37] sm:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-[#d4af37]/60" />
            {story.label}
          </p>}
          <h2 id={`community-${kind}`} className="section-title text-[#fae19c]">{story.title}</h2>
          <p className="section-description mt-3 text-[#f6eedb]/70">{story.description}</p>
        </div>
      </div>

      <figure ref={frameRef} className="community-photo-frame relative rounded-2xl border border-[#d4af37]/40 bg-[#23040a] p-2 shadow-[0_16px_60px_-20px_rgba(212,175,55,0.25)] sm:rounded-3xl sm:p-3">
        <span aria-hidden="true" className="pointer-events-none absolute -left-px -top-px z-10 h-12 w-12 rounded-tl-2xl border-l-2 border-t-2 border-[#f1cf6b] sm:rounded-tl-3xl" />
        <Image src={story.image} alt={story.alt} sizes="(min-width: 1152px) 1088px, 100vw" placeholder="blur" className="h-auto w-full rounded-xl sm:rounded-2xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-px -right-px h-12 w-12 rounded-br-2xl border-b-2 border-r-2 border-[#f1cf6b] sm:rounded-br-3xl" />
        <figcaption className="flex items-center justify-between gap-3 px-2 pb-1 pt-4 text-[9px] uppercase tracking-[0.18em] text-[#d4af37]/80 sm:text-[10px]">
          <span>Kandy Roar · Moments that unite us</span>
          <span aria-hidden="true">✦</span>
          <span className="text-right">AIESEC in Kandy</span>
        </figcaption>
      </figure>
    </section>
  );
}
