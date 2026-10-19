"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Sparkles, Bell, Check, Tag, ShieldCheck, Shirt, Package, Award } from "lucide-react";

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopModal({ isOpen, onClose }: ShopModalProps) {
  const [emailNotify, setEmailNotify] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailNotify.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmailNotify("");
      }, 4000);
    }
  };

  const merchItems = [
    {
      id: "hoodie",
      title: "The King's Velvet Hoodie",
      subtitle: "Official Kandy Roar 7.0 Heavyweight Edition",
      desc: "Deep Royal Crimson fleece with intricate gold embroidered Kandyan lion & 10th anniversary insignia.",
      badge: "Signature Merch",
      icon: Shirt,
      tag: "Pre-Order Soon",
    },
    {
      id: "tee",
      title: "Royal Proclamation Oversized Tee",
      subtitle: "'Hear Ye! Hear Ye! Hear Ye!' Royal Lettering Edition",
      desc: "Premium 240 GSM organic cotton featuring traditional drummer & minister folk murals.",
      badge: "Limited Drop",
      icon: Sparkles,
      tag: "Pre-Order Soon",
    },
    {
      id: "pack",
      title: "The Grand Royal Delegate Pack",
      subtitle: "Full LDS Survival & Keepsake Bundle",
      desc: "Includes official tee, royal enamel pin, leatherette kingdom notebook, metallic pen & lanyard pass.",
      badge: "Best Value",
      icon: Package,
      tag: "Delegate Special",
    },
    {
      id: "accessories",
      title: "Kandyan Lion Enamel Pin & Lanyard",
      subtitle: "Official Keepsake Artifact",
      desc: "Antique brass metal finish with royal crest embossing. Designed to commemorate 10 years of AIESEC in Kandy.",
      badge: "Collector",
      icon: Award,
      tag: "Dropping Soon",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1c060d] border-2 border-[#d4af37]/60 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#f6eedb]"
        style={{
          backgroundImage: "radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent 40%)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#3a0610] hover:bg-[#580b1a] text-[#fae19c] border border-[#d4af37]/30 transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a0610] border border-[#d4af37]/40 text-xs font-bold text-[#fae19c] uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Kingdom Armory & Apparel</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-[#ffffff]">
            Kandy Roar <span className="gold-text">Merch Packs</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#f6eedb]/80">
            Exclusive commemorative merchandise celebrating 10 glorious years of AIESEC in Kandy.
            The royal treasury is preparing orders to launch alongside delegate registrations!
          </p>
        </div>

        {/* Merch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {merchItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#290812]/90 border border-[#d4af37]/30 hover:border-[#d4af37] transition-all hover:shadow-lg hover:shadow-[#d4af37]/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-3 rounded-xl bg-[#3d0a1b] border border-[#d4af37]/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#d4af37] text-[#210408]">
                        {item.badge}
                      </span>
                      <span className="text-[10px] text-[#fae19c]/70 font-mono">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#ffffff] group-hover:text-[#fae19c] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#d4af37] font-medium mb-2">{item.subtitle}</div>
                  <p className="text-xs text-[#f6eedb]/75 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#d4af37]/20 flex items-center justify-between">
                  <span className="text-xs text-[#fae19c]/80 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Reveal on 20th Oct</span>
                  </span>
                  <span className="text-[11px] font-bold uppercase px-3 py-1 rounded-full bg-[#3d0a1b] text-[#fae19c] border border-[#d4af37]/30">
                    Dropping Soon
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification Subscription Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#3a0610] via-[#580b1a] to-[#290812] border border-[#d4af37]/50 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fae19c]">
            <Bell className="w-4 h-4 text-[#d4af37]" />
            <span>Be First In Line When Merch Drops</span>
          </div>
          <p className="text-xs text-[#f6eedb]/85 max-w-md mx-auto">
            Leave your email address to receive priority notification when the shop goes live with delegate sizes and payment details.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold">
              <Check className="w-4 h-4" />
              <span>You will receive royal dispatch as soon as merch opens!</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailNotify}
                onChange={(e) => setEmailNotify(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#190408] border border-[#d4af37]/40 text-xs sm:text-sm text-[#ffffff] outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                className="gold-btn px-5 py-2.5 rounded-xl text-xs uppercase font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Notify Me</span>
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-xs text-[#d4af37]/75 hover:text-[#d4af37] underline underline-offset-4"
          >
            Return to Royal Proclamation
          </button>
        </div>
      </div>
    </div>
  );
}
