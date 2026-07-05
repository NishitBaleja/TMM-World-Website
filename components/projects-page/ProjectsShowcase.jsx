"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import { siteContent } from "@/lib/content";

export default function ProjectsShowcase() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const sections = containerRef.current?.querySelectorAll(".project-card-section");
    if (sections && sections.length > 0) {
      sections.forEach((sec) => {
        const textEls = sec.querySelectorAll(".reveal-text");
        const imgEl = sec.querySelector(".reveal-image");

        gsap.fromTo(
          textEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 75%",
              toggleActions: "play none none none",
            }
          }
        );

        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { opacity: 0, scale: 1.03, y: 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 75%",
                toggleActions: "play none none none",
              }
            }
          );
        }
      });
    }
  }, { scope: containerRef });

  const projects = siteContent.projects;

  return (
    <main
      ref={containerRef}
      className="w-full flex flex-col gap-36 md:gap-52 lg:gap-64 py-24 md:py-36 max-w-7xl mx-auto z-10 relative"
    >
      {projects.map((project, idx) => {
        const isImageLeft = idx % 2 === 0;
        return (
          <article
            key={project.id}
            id={project.id}
            className="project-card-section grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center px-6 sm:px-12 md:px-20 lg:px-24"
          >
            {/* Alternating Image and Content layout */}
            {isImageLeft ? (
              <>
                {/* Image Column */}
                <div className="col-span-1 lg:col-span-6 flex justify-center items-center">
                  <div 
                    className="reveal-image w-full max-w-lg aspect-[3/4] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-2xl" 
                    role="img" 
                    aria-label={`Bespoke system design showing ${project.name}`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 webgl-distort-image"
                      style={{
                        backgroundImage: `url(${project.img})`,
                        backgroundColor: "#0d0d0d"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  </div>
                </div>

                {/* Content Column */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-6 text-left relative">
                  {/* Vertical track label for section category */}
                  <div
                    className="absolute -left-12 lg:-left-16 top-0 text-[9px] uppercase tracking-[0.3em] text-[#908e8b]/40 font-medium select-none pointer-events-none hidden sm:block"
                    style={{ writingMode: "vertical-lr" }}
                  >
                    {project.category}
                  </div>

                  <div className="flex items-baseline gap-4 select-none reveal-text">
                    <span className="font-mono text-xs text-[#908e8b]">{project.num}</span>
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4 max-w-md">
                    <p className="reveal-text font-serif text-lg text-[#e6e4e2] leading-snug font-light italic">
                      {project.lead}
                    </p>
                    <p className="reveal-text text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="reveal-text pt-4 relative group w-fit">
                    <Link
                      href={project.href}
                      className="font-serif text-sm lg:text-base text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
                    >
                      —— view {project.name}
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Content Column (Left on Desktop) */}
                <div className="col-span-1 lg:col-span-6 order-2 lg:order-1 flex flex-col gap-6 text-left relative">
                  {/* Vertical track label for section category */}
                  <div
                    className="absolute -left-12 lg:-left-16 top-0 text-[9px] uppercase tracking-[0.3em] text-[#908e8b]/40 font-medium select-none pointer-events-none hidden sm:block"
                    style={{ writingMode: "vertical-lr" }}
                  >
                    {project.category}
                  </div>

                  <div className="flex items-baseline gap-4 select-none reveal-text">
                    <span className="font-mono text-xs text-[#908e8b]">{project.num}</span>
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4 max-w-md">
                    <p className="reveal-text font-serif text-lg text-[#e6e4e2] leading-snug font-light italic">
                      {project.lead}
                    </p>
                    <p className="reveal-text text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="reveal-text pt-4 relative group w-fit">
                    <Link
                      href={project.href}
                      className="font-serif text-sm lg:text-base text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
                    >
                      —— view {project.name}
                    </Link>
                  </div>
                </div>

                {/* Image Column (Right on Desktop) */}
                <div className="col-span-1 lg:col-span-6 order-1 lg:order-2 flex justify-center items-center">
                  <div 
                    className="reveal-image w-full max-w-lg aspect-[3/4] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-2xl" 
                    role="img" 
                    aria-label={`High-fidelity user interface representation for ${project.name}`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 webgl-distort-image"
                      style={{
                        backgroundImage: `url(${project.img})`,
                        backgroundColor: "#0d0d0d"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  </div>
                </div>
              </>
            )}
          </article>
        );
      })}
    </main>
  );
}
