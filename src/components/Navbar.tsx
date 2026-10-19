"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollText, ShoppingBag, Menu, X, FileCheck2 } from "lucide-react";

interface NavbarProps {
  onOpenShop: () => void;
}

export default function Navbar({ onOpenShop }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#16060c]/90 backdrop-blur-md border-b border-[#d4af37]/25 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand using the full official Kandy Roar logo */}
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-16 sm:w-20 h-12 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/kandy-roar-logo-gold.png"
                  alt="Kandy Roar Official Logo"
                  fill
                  sizes="(min-width: 640px) 80px, 64px"
                  className="object-contain"
                  priority
                />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black tracking-widest text-lg sm:text-xl text-[#f6eedb] group-hover:text-[#fae19c] transition-colors">
                  KANDY ROAR <span className="text-[#d4af37]">7.0</span>
                </span>
              </div>
              <span className="text-[11px] text-[#d4af37]/80 tracking-wider uppercase font-medium">
                AIESEC in Kandy • LEADERSHIP DEVELOPMENT SEMINAR
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => scrollToSection("proclamation")}
              className="text-sm font-medium text-[#f6eedb]/85 hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <ScrollText className="w-4 h-4 text-[#d4af37]" />
              <span>Royal Decree</span>
            </button>

            <button
              onClick={() => scrollToSection("registration")}
              className="text-sm font-medium text-[#f6eedb]/85 hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-[#d4af37]" />
              <span>Royal Registry</span>
            </button>

            {/* Shop Nav Item with Coming Soon Badge */}
            <button
              onClick={onOpenShop}
              className="relative group px-3.5 py-1.5 rounded-lg bg-[#3a0610]/70 border border-[#d4af37]/30 hover:border-[#d4af37] text-sm font-medium text-[#fae19c] transition-all hover:shadow-lg hover:shadow-[#d4af37]/15 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span>Royal Shop</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f1cf6b]"></span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#d4af37] text-[#23040a] font-mono">
                Merch Soon
              </span>
            </button>

            {/* Register CTA */}
            <button
              onClick={() => scrollToSection("registration")}
              className="gold-btn px-6 py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center gap-2"
            >
              <ScrollText className="w-4 h-4" />
              <span>Register Now</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenShop}
              className="p-2 rounded-lg bg-[#3a0610] text-[#fae19c] border border-[#d4af37]/30 text-xs flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[10px] uppercase font-bold">Shop</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#23040a] text-[#fae19c] border border-[#d4af37]/30 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1f060f] border-b border-[#d4af37]/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <button
            onClick={() => scrollToSection("proclamation")}
            className="w-full text-left py-2.5 px-3 rounded-md text-[#f6eedb] hover:bg-[#3a0610] flex items-center gap-2.5 text-sm"
          >
            <ScrollText className="w-4 h-4 text-[#d4af37]" />
            <span>Royal Decree & Proclamation</span>
          </button>
          <button
            onClick={() => scrollToSection("registration")}
            className="w-full text-left py-2.5 px-3 rounded-md text-[#f6eedb] hover:bg-[#3a0610] flex items-center gap-2.5 text-sm"
          >
            <FileCheck2 className="w-4 h-4 text-[#d4af37]" />
            <span>Royal Registry Form</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenShop();
            }}
            className="w-full text-left py-2.5 px-3 rounded-md bg-[#3a0610]/80 text-[#fae19c] border border-[#d4af37]/30 flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              <span>Royal Shop & Merch</span>
            </div>
            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#d4af37] text-[#23040a]">
              Coming Soon
            </span>
          </button>
          <button
            onClick={() => scrollToSection("registration")}
            className="w-full gold-btn py-3 rounded-xl text-center text-xs uppercase font-bold tracking-widest shadow-lg mt-2"
          >
            Answer The Call • Register
          </button>
        </div>
      )}
    </header>
  );
}
