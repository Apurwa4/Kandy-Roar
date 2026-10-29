"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Fixed positions keep the server and client markup identical.
const dust = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 23 + 11) % 100}%`,
  duration: `${18 + (index % 5) * 3}s`,
  delay: `${-index * 3.7}s`,
  size: `${index % 4 === 0 ? 4 : 3}px`,
}));

export default function PageAtmosphere() {
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const resetReveals = () => {
      observer?.disconnect();
      targets.forEach((target) => target.classList.remove("page-reveal-pending"));
    };
    const prepareReveals = () => {
      resetReveals();
      if (motion.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("page-reveal-pending");
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      targets.forEach((target) => {
        // Keep the initial viewport visible; only reveal content further down.
        if (target.getBoundingClientRect().top < window.innerHeight) return;
        target.classList.add("page-reveal-pending");
        observer?.observe(target);
      });
    };
    const revealFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest("[data-reveal]");
      target?.classList.remove("page-reveal-pending");
      if (target) observer?.unobserve(target);
    };
    const pauseWhenHidden = () => {
      atmosphereRef.current?.classList.toggle("atmosphere-paused", document.hidden);
    };

    prepareReveals();
    pauseWhenHidden();
    motion.addEventListener("change", prepareReveals);
    document.addEventListener("focusin", revealFocusedContent);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      resetReveals();
      motion.removeEventListener("change", prepareReveals);
      document.removeEventListener("focusin", revealFocusedContent);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, []);

  return (
    <div ref={atmosphereRef} aria-hidden="true" className="page-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="ambient-light ambient-light-gold" />
      <div className="ambient-light ambient-light-crimson" />
      {dust.map((particle, index) => (
        <span
          key={index}
          className={`gold-dust ${index > 13 ? "hidden sm:block" : ""}`}
          style={{
            left: particle.left,
            top: particle.top,
            "--dust-duration": particle.duration,
            "--dust-delay": particle.delay,
            "--dust-size": particle.size,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
