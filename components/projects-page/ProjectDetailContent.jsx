"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";

export default function ProjectDetailContent({ project, nextProject }) {
  const containerRef = useRef(null);
  const rowsRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Case study rows
    if (rowsRef.current) {
      const rows = rowsRef.current.querySelectorAll(".case-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".reveal-row-el"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Meta info grid
    const metaGrid = container.querySelector(".meta-info-grid");
    if (metaGrid) {
      gsap.fromTo(
        metaGrid,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metaGrid,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Case study image
    const caseImg = container.querySelector(".case-study-image");
    if (caseImg) {
      gsap.fromTo(
        caseImg,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: caseImg,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Next case study link
    const nextBox = container.querySelector(".next-case-box");
    if (nextBox) {
      gsap.fromTo(
        nextBox.querySelectorAll(".reveal-next-el"),
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: nextBox,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: containerRef });

  const caseStudyRows = [
    { num: "01", title: "the challenge", content: project.challenge },
    { num: "02", title: "the solution", content: project.solution },
    { num: "03", title: "the outcome", content: project.outcome },
  ];

  return (
    <div ref={containerRef} className="relative z-10 bg-transparent">
      <main
        id="case-content"
        className="w-full pb-24 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col gap-16 md:gap-24"
      >
        {/* Meta Info Grid */}
        <div className="meta-info-grid grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/5 text-left text-[10px] uppercase tracking-[0.2em] text-[#908e8b] select-none">
          <div className="flex flex-col gap-2">
            <span className="text-white/20">client</span>
            <span className="text-[#e6e4e2] font-medium font-serif text-sm lowercase">
              {project.client}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white/20">year</span>
            <span className="text-[#e6e4e2] font-mono text-sm">
              {project.year}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white/20">discipline</span>
            <span className="text-[#e6e4e2] font-medium font-serif text-sm lowercase">
              {project.category}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white/20">architect</span>
            <span className="text-[#e6e4e2] font-medium font-serif text-sm lowercase">
              tmmworld
            </span>
          </div>
        </div>

        {/* Large Case Study Image */}
        <div className="case-study-image w-full aspect-[16/9] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center" role="img" aria-label={`Bespoke system dashboard preview for ${project.name}`}>
          <div
            className="absolute inset-0 bg-cover bg-center webgl-distort-image"
            style={{
              backgroundImage: `url(${project.img})`,
              backgroundColor: "#0d0d0d",
            }}
          />
          <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
        </div>

        {/* Case Study Detailed Rows */}
        <div ref={rowsRef} className="flex flex-col gap-16 md:gap-24 w-full">
          {caseStudyRows.map((row) => (
            <article
              key={row.num}
              className="case-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-8 border-t border-white/5"
            >
              <div className="lg:col-span-4 flex flex-col gap-2">
                <span className="reveal-row-el text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
                  {row.num}
                </span>
                <h3 className="reveal-row-el font-serif text-2xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
                  {row.title}
                </h3>
              </div>
              <div className="lg:col-span-8">
                <p className="reveal-row-el text-sm md:text-base leading-relaxed text-[#908e8b] font-light max-w-2xl">
                  {row.content}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Next Project Banner */}
        <div className="next-case-box pt-16 border-t border-white/5 flex flex-col items-center justify-center text-center gap-6 mt-12 py-16">
          <span className="reveal-next-el text-[9px] uppercase tracking-[0.3em] text-[#908e8b] font-medium">
            next case study
          </span>
          <Link
            href={nextProject.href}
            className="reveal-next-el font-serif text-4xl sm:text-5xl md:text-6xl text-[#e6e4e2] hover:text-[#d4c3b3] font-light lowercase transition-colors duration-300 relative group pb-2 block webgl-distort-text"
          >
            {nextProject.name}
            <span className="absolute left-0 top-1/2 w-full h-[2px] md:h-[3px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </Link>
          <p className="reveal-next-el text-xs md:text-sm text-[#908e8b] font-light max-w-md">
            {nextProject.lead}
          </p>
        </div>
      </main>
    </div>
  );
}
