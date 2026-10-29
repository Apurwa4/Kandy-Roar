"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useRegistrationCountdown } from "@/lib/use-registration-countdown";

export default function Footer() {
  const { isLive } = useRegistrationCountdown();
  const delegateContacts = [
    {
      name: "Kavishka",
      photo: "/images/kavishka.jpeg",
      email: "kavishkaaushadi@aiesec.net",
      phone: "076 220 6380",
      phoneHref: "tel:+94762206380",
    },
    {
      name: "Dilshi",
      photo: "/images/dilshini.jpeg",
      email: "dilshibandara@aiesec.net",
      phone: "076 289 9108",
      phoneHref: "tel:+94762899108",
    },
  ];

  return (
    <footer className="relative bg-[#080808] border-t border-[#d4af37]/30 pt-10 sm:pt-12 pb-5 text-[#f6eedb] overflow-hidden">
      {/* Decorative top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37] to-[#d4af37]/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-white/10">
          
          {/* Col 1: Event identity and AIESEC branding */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-3">
              <h2 className="sr-only">Kandy Roar 7.0</h2>
              <Image
                src="/images/kandy-roar-logo-transparent.png"
                alt="Kandy Roar"
                width={1722}
                height={913}
                sizes="(min-width: 640px) 224px, 192px"
                className="block w-48 sm:w-56 max-w-full h-auto"
              />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] leading-loose text-[#f6eedb]/75">
                Leadership Development Seminar<br />
                AIESEC in Kandy
              </p>
            </div>

            <div className="w-fit max-w-full py-4 pr-6">
              <Image
                src="/images/aiesec-logo-transparent.png"
                alt="AIESEC"
                width={2172}
                height={724}
                sizes="(min-width: 640px) 208px, 192px"
                className="block w-48 sm:w-52 max-w-full h-auto opacity-90"
              />
            </div>

            <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f6eedb]/70">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#bd1836]" />
              {isLive ? "The Gates Are Open" : "Registrations Open 31 October"}
            </p>
          </div>

          {/* Col 2: Delegate contacts */}
          <div className="md:col-span-7 min-w-0 space-y-4">
            <div className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#d4af37]">
              Meet Your Royal Messengers
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              {delegateContacts.map((contact) => (
                <div
                  key={contact.email}
                  className="flex items-start gap-3 rounded-2xl border border-[#d4af37]/25 bg-[#23040a]/60 p-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#d4af37]/50">
                    <Image
                      src={contact.photo}
                      alt={contact.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="font-heading font-bold text-lg text-[#fae19c]">
                      {contact.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                      Royal Messengers
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-start gap-2 text-sm text-[#f6eedb]/80 hover:text-[#fae19c] transition-colors"
                    >
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                      <span className="break-all">{contact.email}</span>
                    </a>
                    <a
                      href={contact.phoneHref}
                      className="flex items-center gap-2 text-sm text-[#f6eedb]/80 hover:text-[#fae19c] transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                      <span>{contact.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <p className="pt-5 text-center text-xs sm:text-sm leading-relaxed text-[#f6eedb]/60">
          Made with love <span aria-hidden="true">❤️</span> by <span className="font-semibold text-[#fae19c]">Kandy Roar OC</span>
        </p>
      </div>
    </footer>
  );
}
