"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import { siteContent } from "@/lib/content";

export default function ProjectsShowcase() {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  useGSAP(() => {
    const sections = [section1Ref.current, section2Ref.current, section3Ref.current];
    sections.forEach((sec) => {
      if (sec) {
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
      }
    });
  }, { scope: containerRef });

  const practices = siteContent.home.services;
  const projects = siteContent.projects;

  return (
    <main
      ref={containerRef}
      className="w-full flex flex-col gap-36 md:gap-52 lg:gap-64 py-24 md:py-36 max-w-7xl mx-auto z-10 relative"
    >
      {/* Project 1: Systems Architecture (Image Left, Content Right) */}
      {practices[0] && (
        <section
          ref={section1Ref}
          id="project-1"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center px-6 sm:px-12 md:px-20 lg:px-24"
        >
          {/* Left Column: Image */}
          <div className="col-span-1 lg:col-span-6 flex justify-center items-center">
            <div className="reveal-image w-full max-w-lg aspect-[3/4] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 webgl-distort-image"
                style={{
                  backgroundImage: `url(${practices[0].img})`,
                  backgroundColor: "#0d0d0d"
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-6 text-left relative">
            {/* Vertical track label for section category */}
            <div
              className="absolute -left-12 lg:-left-16 top-0 text-[9px] uppercase tracking-[0.3em] text-[#908e8b]/40 font-medium select-none pointer-events-none hidden sm:block"
              style={{ writingMode: "vertical-lr" }}
            >
              systems
            </div>

            <div className="flex items-baseline gap-4 select-none reveal-text">
              <span className="font-mono text-xs text-[#908e8b]">{practices[0].num}</span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
                {practices[0].name}
              </h3>
            </div>

            <div className="flex flex-col gap-4 max-w-md">
              <p className="reveal-text font-serif text-lg text-[#e6e4e2] leading-snug font-light italic">
                {practices[0].lead}
              </p>
              <p className="reveal-text text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                {practices[0].description}
              </p>
            </div>

            <div className="reveal-text pt-4 relative group w-fit">
              <Link
                href={projects[0]?.href || practices[0].href}
                className="font-serif text-sm lg:text-base text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
              >
                —— view {practices[0].name}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Project 2: Interface Craft (Image Right, Content Left) */}
      {practices[1] && (
        <section
          ref={section2Ref}
          id="project-2"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center px-6 sm:px-12 md:px-20 lg:px-24"
        >
          {/* Left Column: Content */}
          <div className="col-span-1 lg:col-span-6 order-2 lg:order-1 flex flex-col gap-6 text-left relative">
            {/* Vertical track label for section category */}
            <div
              className="absolute -left-12 lg:-left-16 top-0 text-[9px] uppercase tracking-[0.3em] text-[#908e8b]/40 font-medium select-none pointer-events-none hidden sm:block"
              style={{ writingMode: "vertical-lr" }}
            >
              interfaces
            </div>

            <div className="flex items-baseline gap-4 select-none reveal-text">
              <span className="font-mono text-xs text-[#908e8b]">{practices[1].num}</span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
                {practices[1].name}
              </h3>
            </div>

            <div className="flex flex-col gap-4 max-w-md">
              <p className="reveal-text font-serif text-lg text-[#e6e4e2] leading-snug font-light italic">
                {practices[1].lead}
              </p>
              <p className="reveal-text text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                {practices[1].description}
              </p>
            </div>

            <div className="reveal-text pt-4 relative group w-fit">
              <Link
                href={projects[1]?.href || practices[1].href}
                className="font-serif text-sm lg:text-base text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
              >
                —— view {practices[1].name}
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="col-span-1 lg:col-span-6 order-1 lg:order-2 flex justify-center items-center">
            <div className="reveal-image w-full max-w-lg aspect-[3/4] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 webgl-distort-image"
                style={{
                  backgroundImage: `url(${practices[1].img})`,
                  backgroundColor: "#0d0d0d"
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
          </div>
        </section>
      )}

      {/* Project 3: Systems Intelligence (Image Left, Content Right) */}
      {practices[2] && (
        <section
          ref={section3Ref}
          id="project-3"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center px-6 sm:px-12 md:px-20 lg:px-24"
        >
          {/* Left Column: Image */}
          <div className="col-span-1 lg:col-span-6 flex justify-center items-center">
            <div className="reveal-image w-full max-w-lg aspect-[3/4] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 webgl-distort-image"
                style={{
                  backgroundImage: `url(${practices[2].img})`,
                  backgroundColor: "#0d0d0d"
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-6 text-left relative">
            {/* Vertical track label for section category */}
            <div
              className="absolute -left-12 lg:-left-16 top-0 text-[9px] uppercase tracking-[0.3em] text-[#908e8b]/40 font-medium select-none pointer-events-none hidden sm:block"
              style={{ writingMode: "vertical-lr" }}
            >
              intelligence
            </div>

            <div className="flex items-baseline gap-4 select-none reveal-text">
              <span className="font-mono text-xs text-[#908e8b]">{practices[2].num}</span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
                {practices[2].name}
              </h3>
            </div>

            <div className="flex flex-col gap-4 max-w-md">
              <p className="reveal-text font-serif text-lg text-[#e6e4e2] leading-snug font-light italic">
                {practices[2].lead}
              </p>
              <p className="reveal-text text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                {practices[2].description}
              </p>
            </div>

            <div className="reveal-text pt-4 relative group w-fit">
              <Link
                href={projects[2]?.href || practices[2].href}
                className="font-serif text-sm lg:text-base text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
              >
                —— view {practices[2].name}
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
