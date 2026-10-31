"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Calendar, Clock, MapPin, ScrollText, ShoppingBag } from "lucide-react";
import { useRegistrationCountdown } from "@/lib/use-registration-countdown";

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const timeLeft = useRegistrationCountdown();
  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-24 h-[500px] w-[500px] rounded-full bg-[#750f24]/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 text-center lg:col-span-7 lg:text-left">
            <p className="inline-flex items-center rounded-full border border-[#d4af37]/30 bg-[#23040a]/70 px-4 py-2 text-[10px] font-semibold tracking-[0.08em] text-[#fae19c] sm:text-xs">
              AIESEC in Kandy · Celebrating 10 Glorious Years
            </p>

            <Image
              src="/images/kandy-roar-logo-transparent.png"
              alt="Kandy Roar Leadership Development Seminar 2026"
              width={1722}
              height={913}
              sizes="(min-width: 640px) 320px, 256px"
              priority
              className="mx-auto h-auto w-full max-w-64 drop-shadow-[0_12px_40px_rgba(212,175,55,0.1)] sm:max-w-80 lg:mx-0"
            />

            <div className="space-y-3">
              <h1 id="hero-heading" className="font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                <span className="gold-text">{timeLeft.isLive ? "The Gates Are Open" : "The Gates Open Soon"}</span>
              </h1>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-[#f6eedb]/75 sm:hidden">
                Two days of leadership, connection, and Kandyan spirit.
              </p>
              <p className="mx-auto hidden max-w-lg text-base leading-relaxed text-[#f6eedb]/75 sm:block lg:mx-0">
                Join the 7th edition of the Leadership Development Seminar.
                Two days of leadership, connection, and Kandyan spirit.
                Answer the royal call and become part of the kingdom&apos;s next chapter.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#fae19c]/85 lg:justify-start">
              <span className="inline-flex items-center gap-2"><Calendar aria-hidden="true" className="h-4 w-4 text-[#d4af37]" />9–10 January · Tentative</span>
              <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="h-4 w-4 text-[#d4af37]" />Kingdom of Kandy</span>
            </div>

            <div className="hero-registration-panel mx-auto max-w-xl rounded-2xl p-5 text-left sm:p-6 lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#fae19c] sm:text-sm">
                <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-[#d4af37]" />
                <p>{timeLeft.isLive ? "Your next chapter starts here" : "Registrations open soon"}</p>
              </div>

              {!timeLeft.isLive && (
                <>
                  <div role="timer" aria-label="Time until registration opens" className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                    {units.map((unit) => (
                      <div key={unit.label} className="rounded-xl border border-[#d4af37]/20 bg-[#110609]/60 px-1 py-3 text-center">
                        <span className="block font-mono text-2xl font-semibold tabular-nums text-[#fae19c] sm:text-3xl">{String(unit.value).padStart(2, "0")}</span>
                        <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.12em] text-[#f6eedb]/60 sm:text-[10px]">{unit.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-center text-[11px] text-[#f6eedb]/55">31 October 2026 · 7:00 PM</p>
                </>
              )}

              {timeLeft.isLive && <p className="mt-3 text-sm leading-relaxed text-[#f6eedb]/70">Registrations are now open. Take your place at Kandy Roar 7.0.</p>}

              <button
                type="button"
                onClick={onRegisterClick}
                className="gold-btn mt-5 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fae19c]"
              >
                <ScrollText aria-hidden="true" className="h-4 w-4" />
                <span>{timeLeft.isLive ? "Enter the Royal Registry" : "View the Royal Registry"}</span>
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <button type="button" disabled title="Royal Shop — coming soon" className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#d4af37]/20 px-4 py-2 text-xs text-[#f6eedb]/60">
                <ShoppingBag aria-hidden="true" className="h-3.5 w-3.5 text-[#d4af37]/70" />
                Royal Shop
                <span className="rounded-full bg-[#d4af37]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#d4af37]">Coming soon</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-5">
            <div aria-hidden="true" className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#d4af37]/8 blur-3xl" />
            <div className="relative aspect-[625/620] w-full max-w-[19rem] sm:max-w-sm lg:max-w-md">
              <Image
                src="/images/kandyan-figures-cutout.png"
                alt="Kandyan royal proclaimer and traditional Geta Beraya drummer"
                fill
                priority
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 384px, 304px"
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
