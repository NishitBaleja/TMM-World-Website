"use client";
import React, { use } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import ProjectDetailBackground from "@/components/projects-page/ProjectDetailBackground";
import ProjectDetailHero from "@/components/projects-page/ProjectDetailHero";
import ProjectDetailContent from "@/components/projects-page/ProjectDetailContent";
import LiquidLensDistortion from "@/components/global/LiquidLensDistortion";
import { siteContent } from "@/lib/content";

export default function ProjectDetailPage({ params }) {
  const { id } = use(params);

  const projectIndex = siteContent.projects.findIndex((p) => p.id === id);
  const project = siteContent.projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject =
    siteContent.projects[(projectIndex + 1) % siteContent.projects.length];

  return (
    <>
      <ProjectDetailBackground />
      <LiquidLensDistortion lensRadius={200} maxDistort={48} solidBlackBg={true}>
        <div className="relative z-10 w-full min-h-screen bg-transparent">
          <Navbar />

          <ProjectDetailHero project={project} />

          <ProjectDetailContent project={project} nextProject={nextProject} />

          <Footer />
        </div>
      </LiquidLensDistortion>
    </>
  );
}
