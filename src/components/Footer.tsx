"use client";

import React from "react";
import Image from "next/image";
import { ScrollText, FileCheck2, ShoppingBag, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onOpenShop: () => void;
}

export default function Footer({ onOpenShop }: FooterProps) {
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
          <div className="md:col-span-5 space-y-4">
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

            <div className="font-sinhala text-sm text-[#fae19c]">
              අසව් අසව් අසව් • රාජකීය සමුළුව 7.0
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
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

          {/* Col 3: Royal Messengers & Contact */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Royal Messengers
            </div>
            <div className="space-y-2.5 text-xs text-[#f6eedb]/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <a
                  href="mailto:apurwa.fernando@aiesec.net"
                  className="hover:text-[#fae19c] transition-colors"
                >
                  apurwa.fernando@aiesec.net
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Kingdom of Kandy, Sri Lanka</span>
              </div>
              <div className="pt-2 text-[11px] text-[#f6eedb]/60">
                Tentative Gathering Dates: <strong>9th–10th January</strong>
              </div>
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
