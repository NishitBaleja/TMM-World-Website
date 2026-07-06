"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export default function ExpertiseHero() {
  const heroRef = useRef(null);
  const smokeRef = useRef(null);

  // Slow down smoke video playback
  useEffect(() => {
    if (smokeRef.current) {
      smokeRef.current.playbackRate = 1;
    }
  }, []);

  useGSAP(() => {
    // Fade out smoke overlay on scroll down
    const smokeEl = heroRef.current.querySelector(".expertise-smoke-overlay");
    if (smokeEl) {
      gsap.fromTo(
        smokeEl,
        { opacity: 0.4 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "40% top",
            end: "bottom top",
            scrub: true,
            onLeave: () => gsap.set(smokeEl, { visibility: "hidden" }),
            onEnterBack: () => gsap.set(smokeEl, { visibility: "visible" }),
          },
        }
      );
    }

    // Scroll entry animations for Hero Section text
    gsap.fromTo(
      heroRef.current.querySelectorAll(".reveal-hero"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power2.out" }
    );

    // Fade out hero content on scroll
    gsap.fromTo(
      heroRef.current.querySelector(".hero-content-wrapper"),
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }, { scope: heroRef });

  // Unscoped hook to animate the global background image outside this component
  useGSAP(() => {
    if (heroRef.current) {
      gsap.to(".expertise-bg-layer", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  });

  return (
    <section
      ref={heroRef}
      id="expertise-hero"
      className="relative w-full h-screen flex flex-col justify-end pb-12 px-12 sm:pl-32 sm:pr-24 lg:pl-[16vw] lg:pr-36 mb-[65vh]"
      aria-label="Expertise Page Hero Header"
    >
      {/* Smoke Video Overlay */}
      <video
        ref={smokeRef}
        className="fixed inset-0 w-full h-full object-cover mix-blend-screen opacity-[0.2] pointer-events-none z-[1] expertise-smoke-overlay"
        src="/video/smoke-overlay.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Left Vertical Track Label */}
      <div
        className="reveal-hero absolute left-4 sm:left-10 lg:left-14 top-48 text-[10px] uppercase tracking-[0.3em] text-white font-medium select-none pointer-events-none"
        style={{ writingMode: "vertical-lr" }}
      >
        expertise
      </div>

      {/* Hero Main Content */}
      <div className="hero-content-wrapper pl-4 sm:pl-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-0 lg:translate-y-[8vh]">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h1 className="reveal-hero font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e6e4e2] leading-[1.1] font-light lowercase select-none webgl-distort-text">
            our expertise & capabilities
          </h1>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 text-left max-w-sm lg:pt-36 lg:translate-y-[15vh]">
          <p className="reveal-hero text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light">
            through three core disciplines, tmmworld shapes prominent brands, engineers custom web solutions, and manages social media presence with premium precision.
          </p>
        </div>
      </div>

      {/* Year Indicator (Bottom Left) */}
      <div className="reveal-hero absolute bottom-12 left-8 sm:left-12 lg:left-16 text-[9px] uppercase tracking-[0.25em] text-[#908e8b] font-medium select-none hidden sm:block">
        ©2026
      </div>

      {/* Scroll Indicator (Bottom Right) */}
      <div className="reveal-hero absolute bottom-12 right-8 sm:right-12 lg:right-16 select-none md:block hidden">
        <a
          href="#brand-building"
          className="hover:text-[#d4c3b3] transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
        >
          scroll
        </a>
      </div>
    </section>
  );
}
