"use client";
import React from "react";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import CompanyBackground from "@/components/company-page/CompanyBackground";
import LiquidLensDistortion from "@/components/global/LiquidLensDistortion";

// Modular Section Components
import BasicInfo from "@/components/company-page/BasicInfo";
import WorldMap from "@/components/company-page/WorldMap";
import Founder from "@/components/company-page/Founder";
import Outline from "@/components/company-page/Outline";

export default function CompanyPageClient() {
  return (
    <>
      <CompanyBackground />
      <LiquidLensDistortion lensRadius={200} maxDistort={48} speedFactor={18} companyMode>
        <div className="relative z-10 w-full min-h-screen bg-transparent text-[#e6e4e2] font-sans overflow-x-hidden">
          <Navbar />
          
          <BasicInfo />
          <WorldMap />
          <Founder />
          <Outline />

          <Footer />
        </div>
      </LiquidLensDistortion>
    </>
  );
}
