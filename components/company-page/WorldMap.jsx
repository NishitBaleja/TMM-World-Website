"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { siteContent } from "@/lib/content";

export default function WorldMap() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const revealMapEls = containerRef.current.querySelectorAll(".reveal-map-el");
    gsap.fromTo(
      revealMapEls,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
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
      id="map"
      className="relative w-full h-[85vh] sm:h-screen flex flex-col justify-center items-center py-20 px-8 sm:px-16 lg:px-24 bg-transparent mb-[55vh]"
    >
      {/* Left Vertical Track */}
      <div
        className="absolute left-8 sm:left-12 lg:left-16 top-16 text-[10px] uppercase tracking-[0.3em] text-[#908e8b]/40 font-medium select-none pointer-events-none"
        style={{ writingMode: "vertical-lr" }}
      >
        company
      </div>

      {/* World Map Background Container */}
      <div className="reveal-map-el relative w-full h-full max-w-5xl rounded-lg bg-cover bg-center flex items-center justify-center overflow-visible border border-white/0 select-none">
        
        {/* Map Outline Placeholder - Stylized SVG Map in Dark Palette */}
        <div className="absolute inset-0 opacity-[0.25] flex items-center justify-center">
          <svg viewBox="0 0 1000 500" className="w-full h-full text-white/50 fill-current">
            <path d="M150,150 Q180,100 250,120 T350,150 T450,220 T520,180 T650,150 T750,120 T850,220 T900,320 L950,450 L750,420 L680,380 L620,440 L550,420 L480,330 L380,350 L250,420 Z" className="fill-white/5" />
            <path d="M680,220 Q720,200 780,240 T840,320 T720,400 Z" className="fill-white/10" />
          </svg>
        </div>

        {/* Dynamic location pins */}
        {siteContent.company.map.locations.map((loc, idx) => (
          <div
            key={idx}
            className="reveal-map-el absolute flex flex-col items-center gap-2 group cursor-pointer"
            style={{ top: loc.top, left: loc.left }}
          >
            {/* Interactive glowing node */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            {/* Text label */}
            <span className="text-[10px] tracking-[0.25em] text-[#e6e4e2] font-mono group-hover:text-[#d4c3b3] transition-colors duration-300 uppercase">
              {loc.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
