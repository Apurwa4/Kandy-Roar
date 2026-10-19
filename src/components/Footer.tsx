"use client";

import React from "react";
import Image from "next/image";
import { ScrollText, FileCheck2, ShoppingBag, Mail, Phone } from "lucide-react";

interface FooterProps {
  onOpenShop: () => void;
}

export default function Footer({ onOpenShop }: FooterProps) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0d0306] border-t border-[#d4af37]/30 pt-16 pb-12 text-[#f6eedb] overflow-hidden">
      {/* Decorative top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37] to-[#d4af37]/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#d4af37]/20">
          
          {/* Col 1: Brand & Proclamation using official Kandy Roar logo */}
          <div className="md:col-span-7 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] via-[#aa7c11] to-[#580b1a] p-0.5 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full rounded-full bg-[#1c050b] flex items-center justify-center p-1">
                  <Image
                    src="/images/kandy-roar-lion-emblem.png"
                    alt="Kandy Roar Lion"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
              <div>
                <div className="font-heading font-black text-xl text-[#ffffff] tracking-wider">
                  KANDY ROAR <span className="gold-text">7.0</span>
                </div>
                <div className="text-xs text-[#d4af37] tracking-wider uppercase font-medium">
                  AIESEC in Kandy • LDS 2026/27
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#f6eedb]/75 leading-relaxed max-w-sm">
              The flagship Leadership Development Seminar of AIESEC in Kandy, celebrating 10 glorious
              years of youth leadership, empowerment, and cultural heritage in the heart of the Kandyan Kingdom.
            </p>

            <div className="font-heading text-sm text-[#fae19c]">
              The Gates Are Open • Royal Gathering 7.0
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-5 lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Royal Portals
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-[#f6eedb]/80 hover:text-[#d4af37] transition-colors flex items-center gap-2"
                >
                  <ScrollText className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>The Royal Proclamation</span>
                </button>
              </li>
              <li>
                <a
                  href="#registration"
                  className="text-[#f6eedb]/80 hover:text-[#d4af37] transition-colors flex items-center gap-2"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Villager Registry Form</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenShop}
                  className="text-[#f6eedb]/80 hover:text-[#d4af37] transition-colors flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Royal Merch Packs (Coming Soon)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Delegate contacts */}
          <div className="md:col-span-12 lg:col-span-4 min-w-0 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Meet Your Royal Messengers
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#f6eedb]/60">
          <div>
            © 2026 Kandy Roar 7.0 • AIESEC in Kandy. All royal rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[#d4af37]">
            <span>10 Years of Royalty • AIESEC in Kandy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
