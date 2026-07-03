"use client";
import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export default function CustomLoader() {
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

    // Fade in text characters from left to right letter by letter, with a soft blur effect
    gsap.fromTo(
      ".loader-char",
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.1,
        duration: 2.0,
        ease: "power2.out"
      }
    );
  });

  if (isLoaded) return null;

  const text = "remember who you are";

  return (
    <div className="loader-container fixed inset-0 z-[9999] bg-[#080808] select-none pointer-events-auto w-full h-screen flex items-center justify-start px-10 md:px-36">
      {/* Text Container aligned exactly like Hero section */}
      <div className="relative z-10 max-w-4xl mt-12 md:mt-24 select-none text-left">
        <h1 className="font-serif text-lg sm:text-2xl md:text-3xl text-[#e6e4e2] leading-[1.4] font-light tracking-wide max-w-lg lowercase">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="loader-char inline-block"
              style={{ minWidth: char === " " ? "0.3em" : "auto" }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* Subtle Percentage Loader in the bottom-left corner */}
      <div className="absolute bottom-10 left-10 md:left-36 select-none flex items-baseline">
        <span className="font-mono text-2xl sm:text-3xl md:text-4xl text-[#908e8b] font-light tracking-tighter">
          {String(progress).padStart(2, "0")}
        </span>
        <span className="font-mono text-sm sm:text-base text-[#908e8b]/40 font-light ml-1">%</span>
      </div>
    </div>
  );
}
