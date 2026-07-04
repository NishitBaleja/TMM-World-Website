"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

// Constants for assets
const INCENSE_IMG = "/images/home/incense-philo.png";
const GARDEN_IMG = "/images/home/garden-philo.png";
const BAMBOO_IMG = "/images/home/bamboo-philo.png";

export default function Philosophy() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);

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
            start: "top 85%",
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
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }



    // Scroll trigger for the two smaller cards above the text
    const leftSmall = sectionRef.current.querySelector(".left-small-card");
    const rightSmall = sectionRef.current.querySelector(".right-small-card");
    if (leftSmall && rightSmall) {
      gsap.fromTo(
        [leftSmall, rightSmall],
        { opacity: 0, y: -20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftSmall,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Scroll trigger for main garden card
    const mainCard = sectionRef.current.querySelector(".main-garden-card");
    if (mainCard) {
      gsap.fromTo(
        mainCard,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mainCard,
            start: "top 85%",
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
      className="relative w-full bg-transparent text-[#e6e4e2] py-24 md:py-36 px-6 sm:px-12 md:px-20 lg:px-24 flex items-center justify-center font-sans border-b border-white/5 overflow-hidden"
    >


      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center z-10 relative">
        {/* Left Column: Headline and Description */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left pl-0 xs:pl-8 sm:pl-16">
          
          {/* Two smaller images above the text (left and right) */}
          <div className="flex flex-row gap-6 mb-8 sm:mb-12 max-w-md pl-4 sm:pl-12">
            {/* Left Card: Incense Burner */}
            <div className="left-small-card w-[130px] sm:w-[160px] aspect-[4/5] bg-[#0c0c0c] border border-white/5 shadow-xl overflow-hidden group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 webgl-distort-image"
                style={{ backgroundImage: `url(${INCENSE_IMG})` }}
              />
            </div>
            {/* Right Card: Bamboo */}
            <div className="right-small-card w-[130px] sm:w-[160px] aspect-[4/5] bg-[#0c0c0c] border border-white/5 shadow-xl overflow-hidden group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 webgl-distort-image"
                style={{ backgroundImage: `url(${BAMBOO_IMG})` }}
              />
            </div>
          </div>

          <h2
            ref={headlineRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#e6e4e2] leading-[1.25] font-light tracking-wide select-none"
          >
            <span className="char-line block webgl-distort-text">Sharing</span>
            <span className="char-line block pl-4 sm:pl-12 webgl-distort-text">the Japanese Spirit</span>
            <span className="char-line block pl-8 sm:pl-48 webgl-distort-text">of Harmony</span>
          </h2>

          <div ref={textRef} className="mt-8 sm:mt-12 pl-4 sm:pl-12 max-w-md">
            <p className="text-sm sm:text-base leading-relaxed text-[#908e8b] font-light">
              Harmony is not something to be created. It is something to be
              remembered. Guided by the ancient spirit of <span className="text-white font-medium">&quot;和&quot; Wa</span>,
              Izanami opens a quiet path back to oneself into harmony with who you
              are, and harmony with the world around you.
            </p>
          </div>
        </div>

        {/* Right Column: Composite Zen Garden Image Card */}
        <div className="col-span-1 lg:col-span-6 flex justify-center lg:justify-end items-center relative mt-16 lg:mt-0 px-4 sm:px-8 lg:px-0">
          {/* Base Zen Garden Card */}
          <div className="main-garden-card relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4] bg-[#0c0c0c] border border-white/5 shadow-2xl overflow-hidden group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 webgl-distort-image"
              style={{ backgroundImage: `url(${GARDEN_IMG})` }}
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
