"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

// Constants for assets to allow easy swapping later
const PHILO_IMG_01 = "https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?auto=format&fit=crop&q=80&w=800"; // Serene bamboo / moss path
const PHILO_IMG_02 = "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?auto=format&fit=crop&q=80&w=800"; // Zen temple wooden corridor
const PHILO_IMG_03 = "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&q=80&w=1000"; // Quiet misty mountain panorama

export default function Philosophy() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const imageGridRef = useRef(null);

  useGSAP(() => {
    // Scroll trigger for the headline (fade & slide up)
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current.querySelectorAll(".char-line"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Scroll trigger for description text
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }


    // Scroll trigger for image elements (fade + scale)
    if (imageGridRef.current) {
      const items = Array.from(imageGridRef.current.querySelectorAll(".philo-img-item"));
      // Animate in a different order: Item 3 (index 2), then Item 1 (index 0), then Item 2 (index 1)
      const animatedOrder = [items[2], items[0], items[1]];
      gsap.fromTo(
        animatedOrder,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="w-full bg-transparent text-[#e6e4e2] py-24 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center font-sans border-b border-white/5"
    >
      <div className="w-full max-w-6xl flex flex-col gap-12 md:gap-20">
        
        {/* Track Label */}
        <div className="w-full text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
            philosophy
          </span>
        </div>

        {/* Serif Statement */}
        <div ref={headlineRef} className="max-w-4xl text-left select-none">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#e6e4e2] leading-[1.3] font-light tracking-wide lowercase">
            <span className="char-line block">sharing</span>
            <span className="char-line block">the japanese spirit</span>
            <span className="char-line block">of harmony</span>
          </h2>
        </div>

        {/* Text and Button Block */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div ref={textRef} className="flex flex-col gap-6 max-w-lg">
            <p className="text-sm sm:text-base leading-relaxed text-[#908e8b] font-light">
              harmony is not something to be created. it is something to be
              remembered. guided by the ancient spirit of <span className="text-white font-medium">&quot;和&quot; (wa)</span>,
              izanami opens a quiet path back to oneself — into harmony with who you
              are, and harmony with the world around you.
            </p>
          </div>


        </div>

        {/* Layout rhythm: visual image placeholders */}
        <div
          ref={imageGridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end w-full mt-12 md:mt-24"
        >
          {/* Practice 1 Placeholder (Tall Left) */}
          <div className="philo-img-item col-span-1 md:col-span-4 flex flex-col gap-4 md:-translate-y-12 md:-rotate-2 transition-transform duration-500">
            <div
              className="w-full aspect-[3/4] bg-[#0c0c0c] border border-white/5 flex items-center justify-center relative overflow-hidden group"
              style={{
                backgroundImage: PHILO_IMG_01 ? `url(${PHILO_IMG_01})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <span className="font-serif text-xs text-white/20 select-none">nature&apos;s quietude</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#908e8b]">01 / quietude</span>
          </div>

          {/* Practice 2 Placeholder (Short Center) */}
          <div className="philo-img-item col-span-1 md:col-span-3 flex flex-col gap-4 md:translate-y-8 md:rotate-2 md:translate-x-2 transition-transform duration-500">
            <div
              className="w-full aspect-[1/1] bg-[#0c0c0c] border border-white/5 flex items-center justify-center relative overflow-hidden group"
              style={{
                backgroundImage: PHILO_IMG_02 ? `url(${PHILO_IMG_02})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <span className="font-serif text-xs text-white/20 select-none">aesthetic space</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#908e8b]">02 / alignment</span>
          </div>

          {/* Practice 3 Placeholder (Tall Right Offset) */}
          <div className="philo-img-item col-span-1 md:col-span-5 flex flex-col gap-4 md:-translate-y-4 md:-rotate-1 md:-translate-x-2 transition-transform duration-500">
            <div
              className="w-full aspect-[4/3] bg-[#0c0c0c] border border-white/5 flex items-center justify-center relative overflow-hidden group"
              style={{
                backgroundImage: PHILO_IMG_03 ? `url(${PHILO_IMG_03})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <span className="font-serif text-xs text-white/20 select-none">inner harmony</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#908e8b]">03 / wholeness</span>
          </div>
        </div>

      </div>
    </section>
  );
}
