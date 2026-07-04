"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

const BG_1 = "/images/home/hero-bg-img.webp";
const BG_2 = "/images/home/projects-bg-img.webp";

export default function CompanyBackground() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Parallax scrolling translation for the background image layers
    gsap.fromTo(
      ".company-bg-layer",
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    const companyTriggers = [];
    const timer = setTimeout(() => {
      const mapEl = document.querySelector("#map");
      const founderEl = document.querySelector("#founder");

      // Set initial states
      gsap.set(".company-bg-page-1", { opacity: 0.99 });
      gsap.set(".company-bg-page-2", { opacity: 0 });

      const basicInfoEl = document.querySelector("#basic-info");

      if (basicInfoEl) {
        // Fade out Background 1 as Basic Info leaves the screen (finishes early at center top)
        companyTriggers.push(
          gsap.to(".company-bg-page-1", {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: basicInfoEl,
              start: "top top",
              end: "center top",
              scrub: true,
            }
          })
        );
      }

      if (mapEl) {
        // Fade Background 2 in as Map enters viewport, and out as it leaves
        const mapTl = gsap.timeline({
          scrollTrigger: {
            trigger: mapEl,
            start: "top 60%",
            end: "bottom top",
            scrub: true,
          }
        });

        // Fade in from 0% to 25% of Map scroll
        mapTl.to(".company-bg-page-2", { opacity: 0.99, duration: 0.25, ease: "none" }, 0);
        // Fade out from 90% to 100% of Map scroll
        mapTl.to(".company-bg-page-2", { opacity: 0, duration: 0.1, ease: "none" }, 0.9);

        companyTriggers.push(mapTl);
      }

      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
      companyTriggers.forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      id="company-background"
      className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none"
    >
      {/* Background 1 (Basic Info) */}
      <div
        className="company-bg-layer company-bg-page-1 absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          top: "-10%",
          bottom: "-10%",
          backgroundImage: `url(${BG_1})`,
          opacity: 0.99,
          backgroundColor: "#000000",
        }}
      />

      {/* Background 2 (Map) */}
      <div
        className="company-bg-layer company-bg-page-2 absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          top: "-10%",
          bottom: "-10%",
          backgroundImage: `url(${BG_2})`,
          opacity: 0,
          backgroundColor: "#000000",
        }}
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/85 z-10 opacity-40" />
    </div>
  );
}
