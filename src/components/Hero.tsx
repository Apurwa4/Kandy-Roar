"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowDown,
  ScrollText,
  ShoppingBag,
  Volume2,
} from "lucide-react";

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const targetDate = new Date("2026-10-24T00:00:00+05:30");

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isLive: false });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Soft Royal Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-br from-[#750f24]/25 via-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#580b1a]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Clean & Balanced */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clean, Spacious Hierarchy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* 10th Anniversary Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#23040a] border border-[#d4af37]/40 shadow-md">
              <span className="text-xs font-semibold tracking-wider text-[#fae19c]">
                AIESEC in Kandy • Celebrating 10 Glorious Years
              </span>
            </div>

            {/* Official Kandy Roar Logo */}
            <div className="pt-1">
              <div className="relative w-full max-w-sm sm:max-w-md h-20 sm:h-24 mx-auto lg:mx-0">
                <Image
                  src="/images/kandy-roar-logo-transparent.png"
                  alt="Kandy Roar Leadership Development Seminar 2026"
                  fill
                  className="object-contain object-center lg:object-left"
                  priority
                />
              </div>
            </div>

            {/* Royal proclamation headline */}
            <div className="space-y-1 overflow-visible">
              <div aria-label="The Gates Are Open" className="royal-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
                {["The Gates", "Are Open"].map((phrase, index) => (
                  <React.Fragment key={phrase}>
                    {index > 0 && " "}
                    <span aria-hidden="true" className="royal-wave-word gold-text" style={{ animationDelay: `${index * -2}s` }}>{phrase}</span>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[11px] tracking-widest uppercase font-mono text-[#d4af37]/90 font-medium">
                <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>A Royal Proclamation to All Villagers</span>
              </div>
            </div>

            {/* Proclamation Copy: Clean and unboxed */}
            <p className="text-sm sm:text-base text-[#f6eedb]/85 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              The royal gates are opening. Join us for the landmark 7th edition of the flagship Leadership Development Seminar. Answer the royal call, fulfil your <span className="text-[#fae19c] font-semibold">Royal Duty</span>, and inscribe your name in the kingdom&apos;s history.
            </p>

            {/* Event Dates & Realm - Minimalist Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#fae19c]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#23040a] border border-[#d4af37]/30">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                <span><strong>9th – 10th January</strong> (Tentative)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#23040a] border border-[#d4af37]/30">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Kingdom of Kandy</span>
              </div>
            </div>

            {/* Countdown Bar: Streamlined and Minimal */}
            <div className="pt-2">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3 px-5 rounded-2xl bg-[#1c050b] border border-[#d4af37]/35 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#fae19c]">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>{timeLeft.isLive ? "Registrations Open Now" : "Registrations Open: 24th Oct"}</span>
                </div>

                {!timeLeft.isLive && (
                  <div className="flex items-center gap-2 font-mono text-sm text-[#ffffff]">
                    <div className="text-center px-2 py-0.5 rounded bg-[#2b0811] border border-[#d4af37]/20">
                      <span className="font-bold text-[#fae19c]">{timeLeft.days}</span>
                      <span className="text-[9px] text-[#d4af37] block uppercase">d</span>
                    </div>
                    <span>:</span>
                    <div className="text-center px-2 py-0.5 rounded bg-[#2b0811] border border-[#d4af37]/20">
                      <span className="font-bold text-[#fae19c]">{timeLeft.hours}</span>
                      <span className="text-[9px] text-[#d4af37] block uppercase">h</span>
                    </div>
                    <span>:</span>
                    <div className="text-center px-2 py-0.5 rounded bg-[#2b0811] border border-[#d4af37]/20">
                      <span className="font-bold text-[#fae19c]">{timeLeft.minutes}</span>
                      <span className="text-[9px] text-[#d4af37] block uppercase">m</span>
                    </div>
                    <span>:</span>
                    <div className="text-center px-2 py-0.5 rounded bg-[#2b0811] border border-[#d4af37]/20">
                      <span className="font-bold text-[#fae19c]">{timeLeft.seconds}</span>
                      <span className="text-[9px] text-[#d4af37] block uppercase">s</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 transition-all"
              >
                <ScrollText className="w-4 h-4" />
                <span>Inscribe in Royal Registry</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </button>

              <button
                type="button"
                disabled
                title="Royal Shop — coming soon"
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#23040a] text-[#fae19c] border border-[#d4af37]/40 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                <span>Royal Merch</span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#d4af37] text-[#23040a]">
                  Soon
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Seamlessly Cutout Kandyan Royal Figures */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Subtle Royal Aura behind the figures */}
            <div className="absolute w-[360px] h-[360px] bg-gradient-to-tr from-[#750f24]/40 via-[#d4af37]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* The Cutout Figures */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[625/620] transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/kandyan-figures-cutout.png"
                alt="Kandyan Royal Proclaimer and Traditional Geta Beraya Drummer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              />
              
              {/* Subtle floor shadow reflection */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/60 blur-md rounded-full pointer-events-none" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
