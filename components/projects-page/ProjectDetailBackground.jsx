"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

export default function ProjectDetailBackground({ bgImg }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Subtle parallax effect on scroll for the background layer
    gsap.fromTo(
      ".project-detail-bg-layer",
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

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      id="project-detail-background"
      className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none"
    >
      {/* Background Image Layer */}
      <div
        className="project-detail-bg-layer absolute inset-0"
        style={{
          top: "-10%",
          bottom: "-10%",
          left: 0,
          right: 0,
          backgroundColor: "#000000",
        }}
      />
      {/* Global Dark Tint Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/85 z-10 opacity-45" />
    </div>
  );
}
