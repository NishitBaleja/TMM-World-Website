"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageFadeWrapper from "@/components/global/LanguageFadeWrapper";

export default function BasicInfo() {
  const { content } = useLanguage();
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
    <LanguageFadeWrapper>
      <section
        ref={containerRef}
        id="basic-info"
        className="relative w-full min-h-screen flex flex-col justify-end pt-36 pb-12 px-12 sm:pl-32 sm:pr-24 lg:pl-[16vw] lg:pr-36 mb-[15vh]"
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
        {/* Sticky Left Vertical Track */}
        <div className="reveal-el absolute top-0 bottom-0 left-4 sm:left-10 lg:left-14 w-8 pointer-events-none z-20">
          <div
            className="sticky top-48 text-[10px] uppercase tracking-[0.3em] text-white font-medium select-none"
            style={{ writingMode: "vertical-lr" }}
          >
            {content.ui.company}
          </div>
        </div>

        {/* Two Column Layout: Title + Subtitle on top, Image Stack (Left) & Description (Right) side-by-side below */}
        <div className="pl-4 sm:pl-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-0 lg:translate-y-[24vh]">
          {/* Row 1: Title + Subtitle (Spans 12 columns, restricted width) */}
          <div className="lg:col-span-12 flex flex-col gap-4 max-w-3xl lg:max-w-[850px]">
            <h1 className="reveal-el font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e6e4e2] leading-[1.15] font-light lowercase select-none webgl-distort-text whitespace-pre-line">
              {content.company.basicInfo.title}
            </h1>
            <span className="reveal-el text-[#908e8b] font-sans text-xs tracking-[0.25em] font-light block mt-1 select-none uppercase">
              {content.company.basicInfo.subtitle}
            </span>
          </div>

          {/* Row 2 - Left: 3 Vertical Images Stack (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-6 mt-6 reveal-el w-full">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="w-full bg-[#0c0c0c] border border-white/5 relative overflow-hidden group shadow-md"
                >
                  <img
                    src={`/images/company/company-hero-${num}.webp`}
                    alt={`Company Hero ${num}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right: Description (Spans 5 columns, starts at col 6 to leave empty columns on the right) */}
          <div className="lg:col-span-5 lg:col-start-6 flex flex-col gap-6 text-left lg:pt-6 lg:translate-y-[2vh]">
            <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
              {content.company.basicInfo.paragraph1}
            </p>
            <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
              {content.company.basicInfo.paragraph2}
            </p>
            <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
              {content.company.basicInfo.paragraph3}
            </p>
            <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
              {content.company.basicInfo.paragraph4}
            </p>
            {content.company.basicInfo.paragraph5 && (
              <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
                {content.company.basicInfo.paragraph5}
              </p>
            )}
            {content.company.basicInfo.paragraph6 && (
              <p className="reveal-el text-xs sm:text-sm leading-relaxed text-[#e6e4e2] font-light">
                {content.company.basicInfo.paragraph6}
              </p>
            )}
          </div>
        </div>

        {/* Year indicator (absolute positioned bottom left) */}
        <div className="reveal-el absolute bottom-12 left-8 sm:left-12 lg:left-16 text-[9px] uppercase tracking-[0.25em] text-[#908e8b] font-medium select-none hidden sm:block">
          ©{new Date().getFullYear()}
        </div>

        {/* Scroll Trigger Pointer (absolute positioned bottom right) */}
        <div className="reveal-el absolute bottom-12 right-8 sm:right-12 lg:right-16 select-none md:block hidden">
          <a
            href="#map"
            className="hover:text-[#d4c3b3] transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            {content.ui.scroll}
          </a>
        </div>
      </section>
    </LanguageFadeWrapper>
  );
}
