"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export default function ProjectDetailHero({ project }) {
  const heroRef = useRef(null);
  const smokeRef = useRef(null);

  // Slow down smoke video playback
  useEffect(() => {
    if (smokeRef.current) {
      smokeRef.current.playbackRate = 0.3;
    }
  }, []);

  // Hero animations
  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Fade out smoke overlay on scroll
    const smokeEl = hero.querySelector(".detail-smoke-overlay");
    if (smokeEl) {
      gsap.fromTo(
        smokeEl,
        { opacity: 0.2 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "40% top",
            end: "bottom top",
            scrub: true,
            onLeave: () => gsap.set(smokeEl, { visibility: "hidden" }),
            onEnterBack: () => gsap.set(smokeEl, { visibility: "visible" }),
          },
        }
      );
    }

    // Reveal hero text
    const revealEls = hero.querySelectorAll(".reveal-hero");
    if (revealEls.length) {
      gsap.fromTo(
        revealEls,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power2.out" }
      );
    }

    // Fade out hero content on scroll
    const wrapper = hero.querySelector(".hero-content-wrapper");
    if (wrapper) {
      gsap.fromTo(
        wrapper,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, { scope: heroRef });



  return (
    <section
      ref={heroRef}
      id="project-detail-hero"
      className="relative w-full h-screen flex flex-col justify-end pb-12 px-12 sm:pl-32 sm:pr-24 lg:pl-[16vw] lg:pr-36 mb-[55vh]"
      aria-label="Case Study Header"
    >
      {/* Smoke Video Overlay */}
      <video
        ref={smokeRef}
        className="fixed inset-0 w-full h-full object-cover mix-blend-screen opacity-[0.2] pointer-events-none z-[1] detail-smoke-overlay"
        src="/video/smoke-overlay.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Left Vertical Track */}
      <div
        className="reveal-hero absolute left-4 sm:left-10 lg:left-14 top-48 text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium select-none pointer-events-none"
        style={{ writingMode: "vertical-lr" }}
      >
        case study
      </div>

      {/* Hero Content */}
      <div className="hero-content-wrapper pl-4 sm:pl-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-0 lg:translate-y-[8vh]">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="reveal-hero text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
            {project.category} / {project.year}
          </span>
          <h1 className="reveal-hero font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e6e4e2] leading-[1.1] font-light lowercase select-none webgl-distort-text">
            {project.name}
          </h1>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 text-left max-w-sm lg:pt-36 lg:translate-y-[15vh]">
          <p className="reveal-hero font-serif text-base text-[#e6e4e2] leading-relaxed font-light italic">
            {project.lead}
          </p>
        </div>
      </div>

      {/* Year Indicator */}
      <div className="reveal-hero absolute bottom-12 left-8 sm:left-12 lg:left-16 text-[9px] uppercase tracking-[0.25em] text-[#908e8b] font-medium select-none">
        ©{project.year}
      </div>

      {/* Scroll Indicator */}
      <div className="reveal-hero absolute bottom-12 right-8 sm:right-12 lg:right-16 select-none md:block hidden">
        <a
          href="#case-content"
          className="hover:text-[#d4c3b3] transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
        >
          scroll
        </a>
      </div>
    </section>
  );
}
