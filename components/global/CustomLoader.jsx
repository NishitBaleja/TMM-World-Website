"use client";
import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useLanguage } from "@/lib/LanguageContext";

export default function CustomLoader() {
  const { content } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";
    if (window.lenis) {
      window.lenis.stop();
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, []);

  useGSAP(() => {
    const progressObj = { value: 0 };
    
    // Simulate page loading percentage progress
    gsap.to(progressObj, {
      value: 100,
      duration: 3.0,
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(Math.floor(progressObj.value));
      },
      onComplete: () => {
        // Fade out loader container smoothly
        gsap.to(".loader-container", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setIsLoaded(true);
            document.body.style.overflow = "";
            if (window.lenis) {
              window.lenis.start();
              // ScrollTrigger might need to refresh once the loader is gone
              setTimeout(() => {
                const { ScrollTrigger } = require("gsap/ScrollTrigger");
                ScrollTrigger.refresh();
              }, 100);
            }
          }
        });
      }
    });

    // Fade in text characters from left to right letter by letter, with a soft blur effect, starting after a brief delay
    gsap.to(".loader-char", {
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.1,
      duration: 2.0,
      delay: 0.5,
      ease: "power2.out"
    });

  });

  if (isLoaded) return null;

  const text = content.home.hero.tagline;

  return (
    <div className="loader-container fixed inset-0 z-[9999] bg-[#080808] select-none pointer-events-auto w-full h-screen flex items-center justify-start px-16 sm:px-32 md:px-[20vw] lg:px-[25vw]">
      {/* Text Container aligned exactly like Hero section */}
      <div className="relative z-10 max-w-4xl mt-12 md:mt-24 select-none text-left">
        <h1 className="font-serif text-[13px] sm:text-sm md:text-[15px] text-[#e6e4e2] leading-[1.4] font-light tracking-wide max-w-md">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="loader-char inline-block"
              style={{
                minWidth: char === " " ? "0.3em" : "auto",
                opacity: 0,
                filter: "blur(8px)"
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Reduced size Percentage Loader absolute-positioned to prevent layout shifts */}
        <div className="loader-progress-container absolute left-0 top-28 md:top-36 select-none flex items-baseline font-mono text-[10px] md:text-[11px] text-[#908e8b]/60 font-light tracking-widest pl-0.5">
          <span>{String(progress).padStart(2, "0")}</span>
          <span className="text-[8px] text-[#908e8b]/40 ml-0.5">%</span>
        </div>
      </div>
    </div>
  );
}
