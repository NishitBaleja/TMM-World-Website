"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { siteContent } from "@/lib/content";

export default function Outline() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const revealOutlineRows = containerRef.current.querySelectorAll(".reveal-outline-row");
    gsap.fromTo(
      revealOutlineRows,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.12,
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
      id="outline"
      className="relative w-full min-h-screen flex flex-col justify-center pt-48 pb-48 px-8 sm:px-16 lg:px-24 border-t border-white/5 mb-[15vh]"
    >
      {/* Left Vertical Track */}
      <div
        className="absolute left-8 sm:left-12 lg:left-16 top-48 text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium select-none pointer-events-none"
        style={{ writingMode: "vertical-lr" }}
      >
        outline
      </div>

      {/* Outline list container structured exactly like mockups */}
      <div className="pl-12 sm:pl-16 w-full max-w-5xl flex flex-col divide-y divide-white/10">
        
        {siteContent.company.outline.map((item, idx) => (
          <div
            key={idx}
            className="reveal-outline-row py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start text-left"
          >
            {/* Left row title */}
            <div className="md:col-span-4 text-[10px] uppercase tracking-[0.25em] text-[#908e8b] font-medium pt-1">
              {item.label}
            </div>

            {/* Right row content block */}
            <div className="md:col-span-8 text-sm md:text-base leading-relaxed text-[#e6e4e2] font-light">
              {/* Render plain string value with linebreaks */}
              {item.value && (
                <span className="whitespace-pre-line font-serif text-base md:text-lg">
                  {item.value}
                </span>
              )}

              {/* Render location arrays */}
              {item.locations && (
                <div className="flex flex-col gap-6">
                  {item.locations.map((loc, lIdx) => (
                    <div key={lIdx} className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#908e8b] font-medium font-mono">
                        {loc.label}
                      </span>
                      <span className="whitespace-pre-line text-sm md:text-base text-[#e6e4e2] font-light">
                        {loc.details}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Render business activities bullets */}
              {item.bullets && (
                <ul className="flex flex-col gap-3">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#d4c3b3] opacity-60"></span>
                      <span className="text-sm md:text-base font-light text-[#e6e4e2]">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
