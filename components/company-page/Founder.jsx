"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { siteContent } from "@/lib/content";

export default function Founder() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const revealFounderEls = containerRef.current.querySelectorAll(".reveal-founder-el");
    gsap.fromTo(
      revealFounderEls,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="founder"
      className="relative w-full min-h-[160vh] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-64 pb-48 px-12 sm:px-16 lg:px-24 border-t border-white/5 mb-[35vh]"
    >
      {/* Left Vertical Track */}
      <div
        className="absolute left-4 sm:left-12 lg:left-16 top-48 text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium select-none pointer-events-none"
        style={{ writingMode: "vertical-lr" }}
      >
        founder
      </div>

      {/* Left Column: Description & Quote */}
      <div className="lg:col-span-6 flex flex-col justify-between text-left pl-12 sm:pl-16">
        
        {/* Founder Header */}
        <div className="flex flex-col gap-4 mt-8 lg:mt-16">
          <h2 className="reveal-founder-el font-serif text-4xl sm:text-5xl md:text-6xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
            {siteContent.company.founder.name}
          </h2>
          <span className="reveal-founder-el text-[10px] uppercase tracking-[0.25em] text-[#908e8b] font-mono font-medium block">
            {siteContent.company.founder.role}
          </span>
          {siteContent.company.founder.translation && (
            <span className="reveal-founder-el text-[#908e8b] text-[11px] tracking-[0.2em] font-light block">
              {siteContent.company.founder.translation}
            </span>
          )}
        </div>

        {/* Bio & Quote */}
        <div className="flex flex-col gap-8 max-w-lg mt-20 lg:mt-32">
          <p className="reveal-founder-el font-serif text-sm md:text-base text-[#e6e4e2] italic font-light leading-relaxed">
            {siteContent.company.founder.quote}
          </p>
          <p className="reveal-founder-el text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
            {siteContent.company.founder.description}
          </p>
        </div>
      </div>

      {/* Right Column: Founder Image Container */}
      <div className="lg:col-span-6 flex items-center justify-center lg:justify-end px-4 lg:px-0">
        <div className="reveal-founder-el w-full max-w-[400px] lg:max-w-lg h-[85vh] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group">
          {/* Founder visual background placeholder, user will swap in actual image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-103 webgl-distort-image"
            style={{
              backgroundImage: `url(${siteContent.company.founder.img})`,
              backgroundColor: "#0d0d0d"
            }}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
          <span className="absolute bottom-4 right-4 font-serif text-[10px] text-white/10 select-none z-0">portrait placeholder</span>
        </div>
      </div>
    </section>
  );
}
