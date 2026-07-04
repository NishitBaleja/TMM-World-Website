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
    </section>
  );
}
