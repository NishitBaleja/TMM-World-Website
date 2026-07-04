"use client";
import React, { useRef, use } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import MainBackground from "@/components/global/MainBackground";
import LiquidLensDistortion from "@/components/global/LiquidLensDistortion";
import { siteContent } from "@/lib/content";

export default function ProjectDetailPage({ params }) {
  // Unwrap params using React.use() to conform to Next.js 15 requirements
  const { id } = use(params);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const projectIndex = siteContent.projects.findIndex(p => p.id === id);
  const project = siteContent.projects[projectIndex];

  if (!project) {
    notFound();
  }

  // Get next project for continuous case study exploration
  const nextProject = siteContent.projects[(projectIndex + 1) % siteContent.projects.length];

  useGSAP(() => {
    const tl = gsap.timeline();

    // Fade in intro headers
    const revealElements = containerRef.current.querySelectorAll(".reveal-el");
    tl.fromTo(
      revealElements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power2.out" }
    );

    // Scroll trigger for case details
    if (contentRef.current) {
      const rows = contentRef.current.querySelectorAll(".case-row");
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
            }
          }
        );
      });
    }

    // Scroll trigger for Next Case study link
    const nextBox = containerRef.current.querySelector(".next-case-box");
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
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <>
      <LiquidLensDistortion lensRadius={160} maxDistort={22} speedFactor={18}>
        <MainBackground forceLayer="projects" />
        <div ref={containerRef} className="relative z-10 w-full min-h-screen bg-transparent">
          <Navbar />
          
          <main className="w-full pt-44 pb-24 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col gap-16 md:gap-24">
            
            {/* Project Hero Headings */}
            <div className="flex flex-col gap-6 max-w-4xl">
              <span className="reveal-el text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
                case study / {project.category}
              </span>
              <h1 className="reveal-el font-serif text-4xl sm:text-6xl md:text-7xl text-[#e6e4e2] leading-[1.15] font-light lowercase webgl-distort-text">
                {project.name}
              </h1>
              <p className="reveal-el font-serif text-lg md:text-xl text-[#e6e4e2] leading-relaxed font-light italic max-w-3xl mt-4">
                {project.lead}
              </p>
            </div>

            {/* Case Study Meta Info Grid */}
            <div className="reveal-el grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/5 text-left text-[10px] uppercase tracking-[0.2em] text-[#908e8b] select-none">
              <div className="flex flex-col gap-2">
                <span className="text-white/20">client</span>
                <span className="text-[#e6e4e2] font-medium font-serif text-sm lowercase">{project.client}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/20">year</span>
                <span className="text-[#e6e4e2] font-mono text-sm">{project.year}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/20">discipline</span>
                <span className="text-[#e6e4e2] font-medium font-serif text-sm lowercase">{project.category}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/20">architect</span>
                <span className="text-[#e6e4e2] font-medium font-serif text-sm lowercase">tmmworld</span>
              </div>
            </div>

            {/* Large Case Study Image */}
            <div className="reveal-el w-full aspect-[16/9] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center webgl-distort-image"
                style={{ backgroundImage: `url(${project.img})`, backgroundColor: "#0d0d0d" }}
              />
              <div className="absolute inset-0 bg-black/15 z-10" />
            </div>

            {/* Case Study Detailed Copy Rows */}
            <div ref={contentRef} className="flex flex-col gap-16 md:gap-24 w-full">
              {/* Row 1: The Challenge */}
              <div className="case-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-8 border-t border-white/5">
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="reveal-row-el text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
                    01
                  </span>
                  <h3 className="reveal-row-el font-serif text-2xl text-[#e6e4e2] font-light lowercase">
                    the challenge
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="reveal-row-el text-sm md:text-base leading-relaxed text-[#908e8b] font-light max-w-2xl">
                    {project.challenge}
                  </p>
                </div>
              </div>

              {/* Row 2: The Solution */}
              <div className="case-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-8 border-t border-white/5">
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="reveal-row-el text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
                    02
                  </span>
                  <h3 className="reveal-row-el font-serif text-2xl text-[#e6e4e2] font-light lowercase">
                    the solution
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="reveal-row-el text-sm md:text-base leading-relaxed text-[#908e8b] font-light max-w-2xl">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Row 3: The Outcome */}
              <div className="case-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-8 border-t border-white/5">
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="reveal-row-el text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
                    03
                  </span>
                  <h3 className="reveal-row-el font-serif text-2xl text-[#e6e4e2] font-light lowercase">
                    the outcome
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="reveal-row-el text-sm md:text-base leading-relaxed text-[#908e8b] font-light max-w-2xl">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Project Dynamic Banner */}
            <div className="next-case-box pt-16 border-t border-white/5 flex flex-col items-center justify-center text-center gap-6 mt-12 py-16">
              <span className="reveal-next-el text-[9px] uppercase tracking-[0.3em] text-[#908e8b] font-medium">
                next case study
              </span>
              <Link
                href={nextProject.href}
                className="reveal-next-el font-serif text-4xl sm:text-5xl md:text-6xl text-[#e6e4e2] hover:text-[#d4c3b3] font-light lowercase transition-colors duration-300 relative group pb-2 block"
              >
                {nextProject.name}
                <span className="absolute left-0 top-1/2 w-full h-[2px] md:h-[3px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
              <p className="reveal-next-el text-xs md:text-sm text-[#908e8b] font-light max-w-md">
                {nextProject.lead}
              </p>
            </div>

          </main>
          
          <Footer />
        </div>
      </LiquidLensDistortion>
    </>
  );
}
