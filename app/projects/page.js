"use client";
import React from "react";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import ProjectsBackground from "@/components/projects-page/ProjectsBackground";
import ProjectsHero from "@/components/projects-page/ProjectsHero";
import ProjectsShowcase from "@/components/projects-page/ProjectsShowcase";
import LiquidLensDistortion from "@/components/global/LiquidLensDistortion";

export default function ProjectsPage() {
  return (
    <>
      <ProjectsBackground />
      <LiquidLensDistortion lensRadius={200} maxDistort={48} speedFactor={18} projectsMode={true}>
        <div className="relative z-10 w-full min-h-screen bg-transparent">
          <Navbar />
          
          <ProjectsHero />
          
          <div className="relative z-10 bg-transparent">
            <ProjectsShowcase />
            <Footer />
          </div>
        </div>
      </LiquidLensDistortion>
    </>
  );
}
