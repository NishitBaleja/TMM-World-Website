"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { siteContent } from "@/lib/content";

export default function BasicInfo() {
  const containerRef = useRef(null);
  const smokeRef = useRef(null);

  // Slow down smoke video playback
  useEffect(() => {
    if (smokeRef.current) {
      smokeRef.current.playbackRate = 1;
    }
  }, []);

  useGSAP(() => {
    const revealEls = containerRef.current.querySelectorAll(".reveal-el");
    gsap.fromTo(
      revealEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power2.out" }
    );

    // Fade out smoke overlay on scroll
    const smokeEl = containerRef.current.querySelector(".company-smoke-overlay");
    if (smokeEl) {
      gsap.fromTo(
        smokeEl,
        { opacity: 0.4 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "40% top",
            end: "bottom top",
            scrub: true,
            onLeave: () => gsap.set(smokeEl, { visibility: "hidden" }),
            onEnterBack: () => gsap.set(smokeEl, { visibility: "visible" }),
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="basic-info"
      className="relative w-full h-screen flex flex-col justify-end pb-12 px-12 sm:pl-32 sm:pr-24 lg:pl-[16vw] lg:pr-36 mb-[55vh]"
      aria-label="Company Overview"
    >
      {/* Smoke Video Overlay */}
      <video
        ref={smokeRef}
        className="fixed inset-0 w-full h-full object-cover mix-blend-screen opacity-[0.2] pointer-events-none z-[1] company-smoke-overlay"
        src="/video/smoke-overlay.webm"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Left Vertical Track */}
      <div
        className="reveal-el absolute left-4 sm:left-10 lg:left-14 top-48 text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium select-none pointer-events-none"
        style={{ writingMode: "vertical-lr" }}
      >
        company
      </div>

      {/* Two Column Layout: Title on Left, Description on Right */}
      <div className="pl-4 sm:pl-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-0 lg:translate-y-[8vh]">
        {/* Left Column: Title */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h1 className="reveal-el font-serif text-3xl sm:text-4xl md:text-5xl text-[#e6e4e2] leading-[1.1] font-light lowercase select-none webgl-distort-text">
            {siteContent.company.basicInfo.title}
          </h1>
          <span className="reveal-el text-[#908e8b] font-sans text-xs tracking-[0.25em] font-light block mt-1 select-none uppercase">
            {siteContent.company.basicInfo.subtitle}
          </span>
        </div>

        {/* Right Column: Description */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left max-w-sm lg:pt-36 lg:translate-y-[15vh]">
          <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
            {siteContent.company.basicInfo.paragraph1}
          </p>
          <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
            {siteContent.company.basicInfo.paragraph2}
          </p>
        </div>
      </div>

      {/* Year indicator (absolute positioned bottom left) */}
      <div className="reveal-el absolute bottom-12 left-8 sm:left-12 lg:left-16 text-[9px] uppercase tracking-[0.25em] text-[#908e8b] font-medium select-none">
        ©{new Date().getFullYear()}
      </div>

      {/* Scroll Trigger Pointer (absolute positioned bottom right) */}
      <div className="reveal-el absolute bottom-12 right-8 sm:right-12 lg:right-16 select-none md:block hidden">
        <a
          href="#map"
          className="hover:text-[#d4c3b3] transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
        >
          scroll
        </a>
      </div>
    </section>
  );
}
