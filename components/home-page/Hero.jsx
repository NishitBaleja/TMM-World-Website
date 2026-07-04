"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

// Constants for assets to allow easy swapping later

const HERO_VIDEO_SRC = ""; // Swapped in with actual video later

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const infoRef = useRef(null);

  const [dubaiTime, setDubaiTime] = useState("00:00:00");
  const [tokyoTime, setTokyoTime] = useState("00:00:00");

  const getTzTime = (offsetHours) => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const tzDate = new Date(utc + 3600000 * offsetHours);
    const h = String(tzDate.getHours()).padStart(2, "0");
    const m = String(tzDate.getMinutes()).padStart(2, "0");
    const s = String(tzDate.getSeconds()).padStart(2, "0");
    return `${h} ${m} ${s}`;
  };

  useEffect(() => {
    const updateTimes = () => {
      setDubaiTime(getTzTime(5.5)); // IST (UTC+5.5)
      setTokyoTime(getTzTime(-4));  // EDT (UTC-4)
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    // Fade and slide tagline up on mount
    const tl = gsap.timeline();

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }
      );
    }



    if (infoRef.current) {
      tl.fromTo(
        infoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=0.8"
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-start px-16 sm:px-32 md:px-[20vw] lg:px-[25vw] bg-transparent"
    >
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mt-12 md:mt-24 select-none">
        <h1
          ref={titleRef}
          className="font-serif text-[13px] sm:text-sm md:text-[15px] text-[#e6e4e2] leading-[1.4] font-light tracking-wide max-w-md webgl-distort-text"
        >
          Remember who you are
        </h1>
      </div>



      {/* Bottom Info Bar */}
      <div
        ref={infoRef}
        className="absolute bottom-6 md:bottom-8 left-8 right-8 md:left-16 md:right-16 z-20 flex flex-row justify-between items-start sm:items-center text-[#908e8b] text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.25em] border-t border-white/5 pt-8 md:pt-10 font-sans"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-16 md:gap-20">
          <span>©{new Date().getFullYear()}</span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 md:gap-16 font-mono text-[11px] sm:text-[12px]">
            <div className="flex items-center gap-2">
              <span className="text-[#e6e4e2]">{dubaiTime}</span>
              <span className="text-[#908e8b] font-sans text-[9px] sm:text-[10px] tracking-widest">ist, new delhi ind</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#e6e4e2]">{tokyoTime}</span>
              <span className="text-[#908e8b] font-sans text-[9px] sm:text-[10px] tracking-widest">edt, new york usa</span>
            </div>
          </div>
        </div>

        <div>
          <a
            href="#philosophy"
            className="hover:text-[#e6e4e2] transition-colors duration-300 select-none cursor-pointer text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] font-medium"
          >
            scroll
          </a>
        </div>
      </div>
    </section>
  );
}
