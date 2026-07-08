"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageFadeWrapper from "@/components/global/LanguageFadeWrapper";

export default function Founder() {
  const { content } = useLanguage();
  const containerRef = useRef(null);

  useGSAP(() => {
    const sections = containerRef.current.querySelectorAll(".team-section");
    sections.forEach((sec) => {
      const revealEls = sec.querySelectorAll(".reveal-team-el");
      gsap.fromTo(
        revealEls,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: containerRef });

  const { founder, headOfTech, headOfMedia } = content.company;

  return (
    <LanguageFadeWrapper>
      <div ref={containerRef} className="w-full relative">
        {/* Sticky Left Vertical Track for the entire Founder & Team group */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-12 lg:left-16 w-8 pointer-events-none">
          <div
            className="sticky top-48 text-[10px] uppercase tracking-[0.3em] text-white font-medium select-none whitespace-nowrap"
            style={{ writingMode: "vertical-lr" }}
          >
            {content.ui.founderAndPillars}
          </div>
        </div>

        {/* 1. Founder Section */}
        <section
          id="founder"
          className="team-section relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-36 pb-36 px-12 sm:px-16 lg:px-24 border-t border-white/5"
          aria-label="Founder Biography"
        >
          {/* Left Column: Description & Quote */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left pl-12 sm:pl-16">
            <div className="flex flex-col gap-4 mt-8 lg:mt-16">
              <h2 className="reveal-team-el font-serif text-4xl sm:text-5xl md:text-6xl text-[#e6e4e2] font-light lowercase">
                {founder.name}
              </h2>
              <span className="reveal-team-el text-[10px] uppercase tracking-[0.25em] text-[#908e8b] font-mono font-medium block">
                {founder.role}
              </span>
            </div>

            <div className="flex flex-col gap-8 max-w-lg mt-20 lg:mt-32">
              <p className="reveal-team-el font-serif text-sm md:text-base text-[#e6e4e2] italic font-light leading-relaxed">
                {founder.quote}
              </p>
              <p className="reveal-team-el text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                {founder.description}
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end px-4 lg:px-0">
            <div className="reveal-team-el w-full max-w-[400px] lg:max-w-lg aspect-[3/4] lg:h-[85vh] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group" role="img" aria-label={`Portrait of ${founder.name}`}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${founder.img})`,
                  backgroundColor: "#0d0d0d"
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* 2. Head of Tech Section (Alternating: Image Left, Text Right) */}
        <section
          id="head-of-tech"
          className="team-section relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-36 pb-36 px-12 sm:px-16 lg:px-24 border-t border-white/5"
          aria-label="Head of Technology Biography"
        >
          {/* Left Column: Image */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex items-center justify-center lg:justify-start px-4 lg:px-0 lg:pl-16">
            <div className="reveal-team-el w-full max-w-[400px] lg:max-w-lg aspect-[3/4] lg:h-[85vh] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group" role="img" aria-label={`Portrait of ${headOfTech.name}`}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${headOfTech.img})`,
                  backgroundColor: "#0d0d0d"
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Description & Quote */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-between text-left pl-12 sm:pl-16 lg:pl-8">
            <div className="flex flex-col gap-4 mt-8 lg:mt-16">
              <h2 className="reveal-team-el font-serif text-4xl sm:text-5xl md:text-6xl text-[#e6e4e2] font-light lowercase">
                {headOfTech.name}
              </h2>
              <span className="reveal-team-el text-[10px] uppercase tracking-[0.25em] text-[#908e8b] font-mono font-medium block">
                {headOfTech.role}
              </span>
            </div>

            <div className="flex flex-col gap-8 max-w-lg mt-20 lg:mt-32">
              <p className="reveal-team-el font-serif text-sm md:text-base text-[#e6e4e2] italic font-light leading-relaxed">
                {headOfTech.quote}
              </p>
              <p className="reveal-team-el text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                {headOfTech.description}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Head of Media Section (Alternating: Text Left, Image Right) */}
        <section
          id="head-of-media"
          className="team-section relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-36 pb-36 px-12 sm:px-16 lg:px-24 border-t border-white/5 mb-[35vh]"
          aria-label="Head of Media & Production Biography"
        >
          {/* Left Column: Description & Quote */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left pl-12 sm:pl-16">
            <div className="flex flex-col gap-4 mt-8 lg:mt-16">
              <h2 className="reveal-team-el font-serif text-4xl sm:text-5xl md:text-6xl text-[#e6e4e2] font-light lowercase">
                {headOfMedia.name}
              </h2>
              <span className="reveal-team-el text-[10px] uppercase tracking-[0.25em] text-[#908e8b] font-mono font-medium block">
                {headOfMedia.role}
              </span>
            </div>

            <div className="flex flex-col gap-8 max-w-lg mt-20 lg:mt-32">
              <p className="reveal-team-el font-serif text-sm md:text-base text-[#e6e4e2] italic font-light leading-relaxed">
                {headOfMedia.quote}
              </p>
              <p className="reveal-team-el text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
                {headOfMedia.description}
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end px-4 lg:px-0">
            <div className="reveal-team-el w-full max-w-[400px] lg:max-w-lg aspect-[3/4] lg:h-[85vh] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group" role="img" aria-label={`Portrait of ${headOfMedia.name}`}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${headOfMedia.img})`,
                  backgroundColor: "#0d0d0d"
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
          </div>
        </section>
      </div>
    </LanguageFadeWrapper>
  );
}
