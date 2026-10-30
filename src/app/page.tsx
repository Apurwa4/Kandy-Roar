"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoyalDecree from "@/components/RoyalDecree";
import RoyalRegistrationForm from "@/components/RoyalRegistrationForm";
import Footer from "@/components/Footer";
import CommunityPhoto, { TogetherWeRoar } from "@/components/CommunityPhoto";
import RecapVideos from "@/components/RecapVideos";
import PageAtmosphere from "@/components/PageAtmosphere";
import SectionDivider from "@/components/SectionDivider";
import ConferenceTeam from "@/components/ConferenceTeam";

export default function Home() {
  const handleScrollToRegister = () => {
    const el = document.getElementById("registration");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#110609] text-[#f6eedb] selection:bg-[#d4af37] selection:text-[#110609] overflow-x-hidden">
      <PageAtmosphere />
      {/* Subtle traditional motif background watermark pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Navigation Bar */}
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section with Official Poster & Proclamation */}
        <Hero
          onRegisterClick={handleScrollToRegister}
        />

        <SectionDivider />
        <CommunityPhoto kind="group" />
        <SectionDivider />

        {/* The 4 Royal Pillars of Kandy Roar 7.0 */}
        <RoyalDecree />

        <SectionDivider />
        <RecapVideos />

        <SectionDivider />
        {/* The Royal Registration Form Portal */}
        <RoyalRegistrationForm />
        <SectionDivider />
        <TogetherWeRoar />
        <SectionDivider />
        <ConferenceTeam />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
