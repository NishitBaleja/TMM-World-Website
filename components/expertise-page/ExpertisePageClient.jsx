"use client";
import React from "react";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import ExpertiseBackground from "@/components/expertise-page/ExpertiseBackground";
import ExpertiseHero from "@/components/expertise-page/ExpertiseHero";
import ExpertiseShowcase from "@/components/expertise-page/ExpertiseShowcase";
import LiquidLensDistortion from "@/components/global/LiquidLensDistortion";

export default function ExpertisePageClient() {
  return (
    <>
      <ExpertiseBackground />
      <LiquidLensDistortion lensRadius={200} maxDistort={48} speedFactor={18} projectsMode={true}>
        <div className="relative z-10 w-full min-h-screen bg-transparent">
          <Navbar />
          
          <ExpertiseHero />
          
          <div className="relative z-10 bg-transparent">
            <ExpertiseShowcase />
            <Footer />
          </div>
        </div>
      </LiquidLensDistortion>
    </>
  );
}
