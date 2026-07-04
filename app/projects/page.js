"use client";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import MainBackground from "@/components/global/MainBackground";
import LiquidLensDistortion from "@/components/global/LiquidLensDistortion";
import { siteContent } from "@/lib/content";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const filters = [
    { label: "all", value: "all" },
    { label: "systems", value: "systems" },
    { label: "interfaces", value: "interfaces" },
    { label: "intelligence", value: "intelligence" }
  ];

  const filteredProjects = activeFilter === "all"
    ? siteContent.projects
    : siteContent.projects.filter(p => p.category === activeFilter);

  // Stagger reveal on grid items
  useGSAP(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card-wrapper");
      
      // Animate entry
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.08, 
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    }
  }, { dependencies: [activeFilter], scope: containerRef });

  return (
    <>
      <LiquidLensDistortion lensRadius={200} maxDistort={48} speedFactor={18}>
        <MainBackground forceLayer="projects" />
        <div ref={containerRef} className="relative z-10 w-full min-h-screen bg-transparent">
          <Navbar />
          
          <main className="w-full pt-44 pb-24 px-6 sm:px-12 md:px-20 lg:px-24 max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
            
            {/* Header / Intro */}
            <div className="flex flex-col gap-6 max-w-3xl">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
                portfolio
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#e6e4e2] leading-[1.2] font-light lowercase webgl-distort-text">
                selected engineering works
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-[#908e8b] font-light max-w-xl">
                a look into custom architectures, high-fidelity experiences, and intelligent pipelines built for global partners.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.25em] border-b border-white/5 pb-6">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`relative py-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
                    activeFilter === f.value ? "text-white font-semibold" : "text-[#908e8b] hover:text-white"
                  }`}
                >
                  {f.label}
                  {activeFilter === f.value && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#e6e4e2] origin-left scale-x-100 transition-transform duration-300" />
                  )}
                </button>
              ))}
            </div>

            {/* Grid list of projects */}
            <div 
              ref={gridRef} 
              className="grid grid-cols-12 gap-8 md:gap-12 w-full mt-6"
            >
              {filteredProjects.map((project, idx) => {
                // Alternate column layouts to make it look like a high-end editorial grid
                const colSpan = idx % 3 === 0 
                  ? "col-span-12 lg:col-span-8" 
                  : idx % 3 === 1 
                  ? "col-span-12 md:col-span-6 lg:col-span-4" 
                  : "col-span-12 md:col-span-6 lg:col-span-6";
                
                const aspectClass = idx % 3 === 0 
                  ? "aspect-[16/10]" 
                  : "aspect-[4/5]";

                return (
                  <div 
                    key={project.id} 
                    className={`${colSpan} project-card-wrapper flex flex-col gap-4 group`}
                  >
                    <Link 
                      href={project.href}
                      className="block w-full overflow-hidden bg-[#0c0c0c] border border-white/5 relative"
                    >
                      <div className={`${aspectClass} w-full relative overflow-hidden flex items-center justify-center`}>
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] webgl-distort-image"
                          style={{ backgroundImage: `url(${project.img})`, backgroundColor: "#0d0d0d" }}
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                        <span className="font-serif text-[10px] text-white/5 select-none z-0">{project.label} details</span>
                      </div>
                    </Link>

                    {/* Metadata & Title */}
                    <div className="flex flex-col gap-2.5 text-left mt-2">
                      <div className="flex items-center gap-3 select-none text-[9px] uppercase tracking-[0.2em] text-[#908e8b]">
                        <span>{project.num}</span>
                        <span>/</span>
                        <span>{project.category}</span>
                        <span>/</span>
                        <span>{project.year}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <Link 
                          href={project.href}
                          className="font-serif text-2xl md:text-3xl text-[#e6e4e2] hover:text-[#d4c3b3] font-light lowercase transition-colors duration-300 relative group webgl-distort-text"
                        >
                          {project.name}
                          <span className="absolute left-0 top-1/2 w-full h-[1px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        </Link>
                      </div>
                      <p className="text-xs md:text-sm leading-relaxed text-[#908e8b] font-light max-w-md">
                        {project.lead}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </main>
          
          <Footer />
        </div>
      </LiquidLensDistortion>
    </>
  );
}
