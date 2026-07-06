
"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import Logo from "../global/Logo";
import { siteContent } from "@/lib/content";

// Constants for assets to allow easy swapping later
const COMP_BG_IMG = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"; // Quiet minimal office/interior space

export default function Company() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  const [dubaiTime, setDubaiTime] = useState({ h: "00", m: "00", s: "00" });
  const [tokyoTime, setTokyoTime] = useState({ h: "00", m: "00", s: "00" });

  const getTzTimeObj = (offsetHours) => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const tzDate = new Date(utc + 3600000 * offsetHours);
    return {
      h: String(tzDate.getHours()).padStart(2, "0"),
      m: String(tzDate.getMinutes()).padStart(2, "0"),
      s: String(tzDate.getSeconds()).padStart(2, "0")
    };
  };

  useEffect(() => {
    const updateTimes = () => {
      setDubaiTime(getTzTimeObj(siteContent.global.addresses.newDelhi.timezone));
      setTokyoTime(getTzTimeObj(siteContent.global.addresses.newYork.timezone));
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    // Hierarchical text reveal using a timeline for reliable sequencing
    const elements = contentRef.current?.children;
    if (elements && elements.length > 0) {
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      Array.from(elements).forEach((el, i) => {
        revealTl.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
          },
          i * 0.15 // stagger by position in timeline
        );
      });
    }

    // Parallax background image (subtle translate)
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="company"
      className="relative w-full min-h-screen bg-transparent text-[#e6e4e2] flex items-center justify-center py-24 md:py-36 px-12 md:px-12 overflow-clip"
      aria-label="About the Collective"
    >
      {/* Sticky Left Vertical Track */}
      <div className="absolute top-0 bottom-0 left-4 sm:left-12 lg:left-16 w-8 pointer-events-none z-20">
        <div
          className="sticky top-48 text-[10px] uppercase tracking-[0.3em] text-white font-medium select-none"
          style={{ writingMode: "vertical-lr" }}
        >
          company
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center gap-10 md:gap-14 font-sans"
      >

        {/* Logo Icon */}
        <div className="flex flex-col items-center justify-center text-[#e6e4e2] select-none scale-110">
          <Logo className="w-14 h-28 md:w-16 md:h-32" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#e6e4e2] font-light tracking-wide lowercase select-none webgl-distort-text">
          {siteContent.home.company.heading}
        </h2>

        {/* Text descriptions */}
        <div className="flex flex-col gap-6 max-w-2xl text-sm sm:text-base leading-relaxed text-[#908e8b] font-light text-center px-4">
          {siteContent.home.company.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Clocks Detail Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 w-full max-w-lg py-8 mt-4 select-none">
          
          {/* New Delhi Clock */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 font-mono text-3xl md:text-4xl text-white font-extralight tracking-wider">
              <span>{dubaiTime.h}</span>
              <span className="text-white/30 font-light select-none"> </span>
              <span>{dubaiTime.m}</span>
              <span className="text-white/30 font-light select-none"> </span>
              <span className="text-white/60 text-2xl md:text-3xl font-light">{dubaiTime.s}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#908e8b]">{siteContent.global.addresses.newDelhi.timezoneLabel}</span>
          </div>

          {/* New York Clock */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 font-mono text-3xl md:text-4xl text-white font-extralight tracking-wider">
              <span>{tokyoTime.h}</span>
              <span className="text-white/30 font-light select-none"> </span>
              <span>{tokyoTime.m}</span>
              <span className="text-white/30 font-light select-none"> </span>
              <span className="text-white/60 text-2xl md:text-3xl font-light">{tokyoTime.s}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#908e8b]">{siteContent.global.addresses.newYork.timezoneLabel}</span>
          </div>

        </div>

        {/* Button */}
        <div className="pt-4 relative group w-fit mx-auto">
          <Link
            href="/company"
            className="font-serif text-lg md:text-xl text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
          >
            view company
            <span className="absolute left-0 top-1/2 w-full h-[1.5px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </Link>
        </div>

      </div>
    </section>
  );
}
