"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageFadeWrapper from "@/components/global/LanguageFadeWrapper";

export default function WorldMap() {
  const { content } = useLanguage();
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
    <LanguageFadeWrapper>
      <section
        ref={containerRef}
        id="map"
        className="relative w-full h-[70vh] sm:h-[80vh] flex flex-col justify-center items-center py-12 px-12 sm:px-16 lg:px-24 bg-transparent mb-[35vh]"
        aria-label="Global Presence Map"
      >
        {/* Sticky Left Vertical Track */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-12 lg:left-16 w-8 pointer-events-none">
          <div
            className="sticky top-48 text-[10px] uppercase tracking-[0.3em] text-white font-medium select-none"
            style={{ writingMode: "vertical-lr" }}
          >
            {content.ui.presence}
          </div>
        </div>
      </section>
    </LanguageFadeWrapper>
  );
}
