"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { siteContent } from "@/lib/content";

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

    // Scroll trigger for description text (appears after headline)
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Sequential image animation: 1 -> 2 -> 3 using a shared timeline
    const img1 = sectionRef.current.querySelector(".philo-img-1");
    const img2 = sectionRef.current.querySelector(".philo-img-2");
    const img3 = sectionRef.current.querySelector(".philo-img-3");

    // Use the section as trigger so all 3 images animate together in sequence
    const imgTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    if (img1) {
      imgTl.fromTo(
        img1,
        { opacity: 0, y: 60, scale: 1.05 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" },
        0 // starts at 0s
      );
    }

    if (img2) {
      imgTl.fromTo(
        img2,
        { opacity: 0, y: 50, scale: 1.05 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" },
        0.5 // starts at 0.5s — noticeable gap after img1
      );
    }

    if (img3) {
      imgTl.fromTo(
        img3,
        { opacity: 0, y: 80, scale: 1.04 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" },
        1.1 // starts at 1.1s — clear gap after img2
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full bg-transparent text-[#e6e4e2] py-24 md:py-36 px-6 sm:px-12 md:px-20 lg:px-24 flex items-center justify-center font-sans overflow-visible"
    >


      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center z-10 relative">
        {/* Left Column: Headline and Description */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left pl-0 xs:pl-8 sm:pl-16">
          
          {/* Image 1: Incense Burner - bigger */}
          <div className="flex flex-row gap-6 mb-8 sm:mb-12 max-w-md pl-4 sm:pl-12">
            <div className="philo-img-1 w-[180px] sm:w-[220px] aspect-[3/4] bg-[#0c0c0c] border border-white/5 shadow-xl overflow-hidden group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 webgl-distort-image"
                style={{ backgroundImage: `url(${INCENSE_IMG})` }}
              />
            </div>
          </div>

          <h2
            ref={headlineRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#e6e4e2] leading-[1.25] font-light tracking-wide select-none"
          >
            <span className="char-line block webgl-distort-text">{siteContent.home.philosophy.headlineLine1}</span>
            <span className="char-line block pl-4 sm:pl-12 webgl-distort-text">{siteContent.home.philosophy.headlineLine2}</span>
            <span className="char-line block pl-8 sm:pl-28 webgl-distort-text">{siteContent.home.philosophy.headlineLine3}</span>
          </h2>

          <div ref={textRef} className="mt-8 sm:mt-12 pl-4 sm:pl-12 max-w-md">
            <p className="text-sm sm:text-base leading-relaxed text-[#908e8b] font-light">
              {siteContent.home.philosophy.description}
            </p>
          </div>
        </div>

        {/* Right Column: Garden Image Card with Image 2 overlapping on top-right */}
        <div className="col-span-1 lg:col-span-6 flex justify-center lg:justify-end items-center relative mt-16 lg:mt-0 px-4 sm:px-8 lg:px-0 overflow-visible">
          {/* Container for overlapping layout - explicit sizing */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
            {/* Image 3: Base Zen Garden Card */}
            <div className="philo-img-3 w-full aspect-[3/4] bg-[#0c0c0c] border border-white/5 shadow-2xl overflow-hidden group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 webgl-distort-image"
                style={{ backgroundImage: `url(${GARDEN_IMG})` }}
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 2: Bamboo - overlapping top-right corner of Image 3 */}
            <div className="philo-img-2 absolute -top-12 -right-10 sm:-top-16 sm:-right-14 w-[140px] sm:w-[180px] aspect-[3/4] bg-[#0c0c0c] border border-white/5 shadow-2xl overflow-hidden group z-20">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 webgl-distort-image"
                style={{ backgroundImage: `url(${BAMBOO_IMG})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
