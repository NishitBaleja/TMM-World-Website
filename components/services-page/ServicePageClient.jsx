"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageFadeWrapper from "@/components/global/LanguageFadeWrapper";
import Link from "next/link";

export default function ServicePageClient({ serviceId }) {
  const { content } = useLanguage();
  const containerRef = useRef(null);
  const smokeRef = useRef(null);

  const details = content.serviceDetails[serviceId];

  // Playback rate adjustment for smoke video
  useEffect(() => {
    if (smokeRef.current) {
      smokeRef.current.playbackRate = 1.0;
    }
  }, []);

  useGSAP(() => {
    // Entrance animations for headers and content elements
    const revealEls = containerRef.current.querySelectorAll(".reveal-el");
    gsap.fromTo(
      revealEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, stagger: 0.12, ease: "power2.out" }
    );

    // Fade out smoke video overlay on scroll
    const smokeEl = smokeRef.current;
    if (smokeEl) {
      gsap.fromTo(
        smokeEl,
        { opacity: 0.25 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
            onLeave: () => gsap.set(smokeEl, { visibility: "hidden" }),
            onEnterBack: () => gsap.set(smokeEl, { visibility: "visible" }),
          },
        }
      );
    }

    // Parallax scroll effect for staggered portrait images
    const images = containerRef.current.querySelectorAll(".staggered-image");
    images.forEach((img, index) => {
      const speed = [ -15, 10, -5 ][index] || 0; // different parallax directions & speeds
      gsap.fromTo(
        img,
        { yPercent: speed },
        {
          yPercent: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  if (!details) {
    return (
      <LanguageFadeWrapper>
        <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white">
          <div className="text-center flex flex-col gap-4">
            <h1 className="font-serif text-3xl">{content.ui.serviceNotFound}</h1>
            <Link href="/" className="text-sm underline text-[#d4c3b3]">{content.ui.goBackHome}</Link>
          </div>
        </div>
      </LanguageFadeWrapper>
    );
  }

  return (
    <LanguageFadeWrapper>
      <div ref={containerRef} className="relative z-10 w-full min-h-screen bg-[#080808] text-[#e6e4e2] font-sans overflow-x-clip">
        <Navbar />

        {/* Smoke Video Overlay */}
        <video
          ref={smokeRef}
          className="fixed inset-0 w-full h-full object-cover mix-blend-screen opacity-[0.25] pointer-events-none z-[1]"
          src="/video/smoke-overlay.webm"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Hero Section */}
        <section className="relative w-full pt-48 pb-20 px-6 sm:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col gap-8 z-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="reveal-el text-[#908e8b] font-sans text-xs tracking-[0.25em] font-light block uppercase">
              {content.ui.serviceDetail}
            </span>
            <h1 className="reveal-el font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#e6e4e2] leading-[1.1] font-light lowercase select-none">
              {details.title}
            </h1>
            <p className="reveal-el text-lg sm:text-xl text-[#d4c3b3] font-serif font-light italic mt-2">
              {details.subtitle}
            </p>
          </div>
          <div className="reveal-el max-w-2xl text-sm sm:text-base leading-relaxed text-[#908e8b] font-light mt-4">
            {details.extendedDesc}
          </div>
        </section>

      {/* Unique Staggered 3-Image Layout (9:16 Aspect Ratio) */}
      <section className="w-full py-16 px-6 sm:px-16 lg:px-24 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 items-start">
          
          {/* Image 1: Left column, standard position with parallax */}
          <div className="staggered-image flex flex-col gap-4 w-full aspect-[9/16] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${details.images[0]})` }}
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-[#908e8b] tracking-wider uppercase select-none">
              {content.ui.discipline} — 01
            </div>
          </div>

          {/* Image 2: Middle column, offset lower, slightly larger */}
          <div className="staggered-image flex flex-col gap-4 w-full aspect-[9/16] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group shadow-2xl md:translate-y-24">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${details.images[1]})` }}
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-[#908e8b] tracking-wider uppercase select-none">
              {content.ui.execution} — 02
              </div>
          </div>

          {/* Image 3: Right column, offset higher */}
          <div className="staggered-image flex flex-col gap-4 w-full aspect-[9/16] bg-[#0c0c0c] border border-white/5 relative overflow-hidden group shadow-2xl md:-translate-y-12">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${details.images[2]})` }}
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-[#908e8b] tracking-wider uppercase select-none">
              {content.ui.outcome} — 03
            </div>
          </div>

        </div>
      </section>

      {/* Process & Details Section */}
      <section className="w-full py-20 px-6 sm:px-16 lg:px-24 max-w-7xl mx-auto z-10 relative mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Header */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-[#908e8b] text-[10px] tracking-[0.25em] uppercase font-semibold">{content.ui.methodology}</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e6e4e2] font-light lowercase">
              {content.ui.howWeExecute}
            </h2>
          </div>

          {/* Right List */}
          <div className="lg:col-span-8 flex flex-col gap-12 w-full">
            {details.process.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-12 pb-8 border-b border-white/5 items-start">
                <span className="font-mono text-xs text-[#908e8b] pt-1">0{idx + 1}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#e6e4e2] font-light lowercase">{step.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#908e8b] font-light max-w-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  </LanguageFadeWrapper>
  );
}
