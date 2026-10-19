"use client";

import React from "react";
import { Shield, Award, Users, Compass, Music } from "lucide-react";

export default function RoyalDecree() {
  const pillars = [
    {
      icon: Users,
      title: "Interactive Sessions",
      subtitle: "Learn, Share & Lead",
      description:
        "Build your leadership skills through hands-on activities, meaningful discussions, and shared learning with fellow delegates.",
    },
    {
      icon: Award,
      title: "Nova 26'",
      subtitle: "The Award Ceremony",
      description:
        "Celebrate achievements, recognize dedication, and honour the people who make AIESEC in Kandy shine.",
    },
    {
      icon: Compass,
      title: "OBT",
      subtitle: "Outbound Training",
      description:
        "Step outdoors for team challenges that build trust, strengthen collaboration, and put your leadership into action.",
    },
    {
      icon: Music,
      title: "DJ Party",
      subtitle: "Music, Dance & Celebration",
      description:
        "Celebrate together, hit the dance floor, and make unforgettable memories with fellow delegates at the DJ party.",
    },
  ];

  return (
    <section id="proclamation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a0610] border border-[#d4af37]/40 text-xs font-bold text-[#fae19c] uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>The Royal Experience</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#ffffff]">
          The Pillars of <span className="gold-text">Kandy Roar 7.0</span>
        </h2>
        <p className="text-sm sm:text-base text-[#f6eedb]/80 max-w-2xl mx-auto">
          An immersive two-day residential seminar rooted in Kandyan heritage, designed to ignite
          your leadership journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, idx) => {
          const IconComponent = p.icon;
          return (
            <div
              key={idx}
              className="crimson-card crimson-card-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="mb-4 p-3 rounded-2xl bg-[#3a0610] border border-[#d4af37]/30 inline-block group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="font-heading font-black text-lg text-[#ffffff] group-hover:text-[#fae19c] transition-colors">
                  {p.title}
                </h3>
                <div className="text-xs text-[#d4af37] font-semibold mt-0.5 mb-2.5">
                  {p.subtitle}
                </div>
                <p className="text-xs text-[#f6eedb]/75 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#d4af37]/20 flex items-center justify-between text-[11px] text-[#fae19c]">
                <span>Pillar 0{idx + 1}</span>
                <span className="text-[10px] text-[#d4af37]">The Kandyan Kingdom</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
