"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const delegateContacts = [
    {
      name: "Kavishka",
      photo: "/images/kavishka.jpeg",
      email: "kavishkaaushadi@aiesec.net",
      phone: "076 220 6380",
      phoneHref: "tel:+94762206380",
    },
    {
      name: "Dilshini",
      photo: "/images/dilshini.jpeg",
      email: "dilshibandara@aiesec.net",
      phone: "076 289 9108",
      phoneHref: "tel:+94762899108",
    },
  ];

  return (
    <footer className="relative bg-[#080808] border-t border-[#d4af37]/30 pt-16 sm:pt-20 pb-10 text-[#f6eedb] overflow-hidden">
      {/* Decorative top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37] to-[#d4af37]/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 sm:pb-20 border-b border-white/10">
          
          {/* Col 1: Event identity and AIESEC branding */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-5">
              <h2 className="font-heading font-black text-3xl sm:text-4xl leading-tight tracking-tight text-white">
                KANDY ROAR <span className="text-[#bd1836]">7.0</span>
              </h2>
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] leading-loose text-[#f6eedb]/75">
                Leadership Development Seminar<br />
                AIESEC in Kandy
              </p>
            </div>

            <div className="w-full max-w-xs bg-white px-6 py-6 sm:px-8 sm:py-7">
              <Image
                src="/images/aiesec-logo.png"
                alt="AIESEC"
                width={2048}
                height={292}
                sizes="(min-width: 640px) 256px, 272px"
                className="block w-full h-auto"
              />
            </div>

            <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f6eedb]/70">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#bd1836]" />
              The Gates Are Open
            </p>
          </div>

          {/* Col 2: Delegate contacts */}
          <div className="md:col-span-7 min-w-0 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Meet Your Royal Messengers
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3">
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
                    <h3 className="font-heading font-bold text-base text-[#fae19c]">
                      {contact.name}
                    </h3>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37]">
                      Royal Messengers
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-start gap-2 text-xs text-[#f6eedb]/80 hover:text-[#fae19c] transition-colors"
                    >
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                      <span className="break-all">{contact.email}</span>
                    </a>
                    <a
                      href={contact.phoneHref}
                      className="flex items-center gap-2 text-xs text-[#f6eedb]/80 hover:text-[#fae19c] transition-colors"
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
        <div className="pt-8 font-mono text-[10px] uppercase tracking-[0.18em] leading-loose text-[#f6eedb]/50">
          © 2026 Kandy Roar 7.0 • AIESEC in Kandy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
