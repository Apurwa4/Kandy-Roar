"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoyalDecree from "@/components/RoyalDecree";
import RoyalRegistrationForm from "@/components/RoyalRegistrationForm";
import ShopModal from "@/components/ShopModal";
import Footer from "@/components/Footer";
import CommunityPhoto from "@/components/CommunityPhoto";

export default function Home() {
  const [shopOpen, setShopOpen] = useState(false);

  const handleScrollToRegister = () => {
    const el = document.getElementById("registration");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#110609] text-[#f6eedb] selection:bg-[#d4af37] selection:text-[#110609] overflow-x-hidden">
      {/* Subtle traditional motif background watermark pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Navigation Bar */}
      <Navbar onOpenShop={() => setShopOpen(true)} />

      <main className="relative z-10">
        {/* Hero Section with Official Poster & Proclamation */}
        <Hero
          onRegisterClick={handleScrollToRegister}
          onOpenShop={() => setShopOpen(true)}
        />

        <CommunityPhoto kind="group" />

        {/* The 4 Royal Pillars of Kandy Roar 7.0 */}
        <RoyalDecree />

        {/* The Royal Registration Form Portal */}
        <RoyalRegistrationForm />
        <CommunityPhoto kind="eb" />
        <CommunityPhoto kind="members" />
      </main>

      {/* Footer */}
      <Footer onOpenShop={() => setShopOpen(true)} />

      {/* Royal Merch Shop Preview Modal */}
      <ShopModal
        isOpen={shopOpen}
        onClose={() => setShopOpen(false)}
      />
    </div>
  );
}
