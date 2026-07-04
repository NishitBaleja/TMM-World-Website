"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

const HERO_IMAGE_URL = "/images/home/hero-bg-img.webp";
const PHILO_IMAGE_URL = "/images/home/philosophy-bg-img.webp";
const PROJECTS_IMAGE_URL = "/images/home/projects-bg-img.webp";
const COMPANY_IMAGE_URL = "/images/home/company-bg-img.webp";

export default function MainBackground() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Subtle parallax effect on scroll for all background layers
    gsap.fromTo(
      ".bg-image-layer",
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

    const triggers = [];
    const timer = setTimeout(() => {
      // Transition from Hero to Philosophy
      triggers.push(
        gsap.to(containerRef.current, {
          "--fade-hero-to-philosophy": 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#philosophy",
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        })
      );

      // Transition from Philosophy to Projects
      triggers.push(
        gsap.to(containerRef.current, {
          "--fade-philosophy-to-projects": 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        })
      );

      // Transition from Projects to Company
      triggers.push(
        gsap.to(containerRef.current, {
          "--fade-projects-to-company": 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#company",
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        })
      );

      // Transition from Company to Footer (Fading out)
      triggers.push(
        gsap.to(containerRef.current, {
          "--fade-company-to-footer": 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#footer",
            start: "top bottom",
            end: "top 50%",
            scrub: true,
          }
        })
      );

      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
      triggers.forEach(t => t.kill());
    };
  });

  return (
    <div
      ref={containerRef}
      id="main-background"
      className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none"
      style={{
        "--fade-hero-to-philosophy": 0,
        "--fade-philosophy-to-projects": 0,
        "--fade-projects-to-company": 0,
        "--fade-company-to-footer": 0,
      }}
    >
      {/* Hero Background Layer */}
      <div
        className="bg-image-layer bg-hero-layer absolute bg-cover bg-center bg-no-repeat"
        style={{
          top: "-10%",
          bottom: "-10%",
          left: 0,
          right: 0,
          backgroundImage: `url(${HERO_IMAGE_URL})`,
          opacity: "calc(0.99 * clamp(0, (0.4 - var(--fade-hero-to-philosophy)) / 0.4, 1))",
          backgroundColor: "#000000",
        }}
      />

      {/* Philosophy Background Layer */}
      <div
        className="bg-image-layer bg-philosophy-layer absolute bg-cover bg-center bg-no-repeat"
        style={{
          top: "-10%",
          bottom: "-10%",
          left: 0,
          right: 0,
          backgroundImage: `url(${PHILO_IMAGE_URL})`,
          opacity: "calc(0.99 * clamp(0, (var(--fade-hero-to-philosophy) - 0.6) / 0.4, 1) * clamp(0, (0.4 - var(--fade-philosophy-to-projects)) / 0.4, 1))",
          backgroundColor: "#000000",
        }}
      />

      {/* Projects Background Layer */}
      <div
        className="bg-image-layer bg-projects-layer absolute bg-cover bg-center bg-no-repeat"
        style={{
          top: "-10%",
          bottom: "-10%",
          left: 0,
          right: 0,
          backgroundImage: `url(${PROJECTS_IMAGE_URL})`,
          opacity: "calc(0.99 * clamp(0, (var(--fade-philosophy-to-projects) - 0.6) / 0.4, 1) * clamp(0, (0.4 - var(--fade-projects-to-company)) / 0.4, 1))",
          backgroundColor: "#000000",
        }}
      />

      {/* Company Background Layer */}
      <div
        className="bg-image-layer bg-company-layer absolute bg-cover bg-center bg-no-repeat"
        style={{
          top: "-10%",
          bottom: "-10%",
          left: 0,
          right: 0,
          backgroundImage: `url(${COMPANY_IMAGE_URL})`,
          opacity: "calc(0.99 * clamp(0, (var(--fade-projects-to-company) - 0.6) / 0.4, 1) * clamp(0, (0.4 - var(--fade-company-to-footer)) / 0.4, 1))",
          backgroundColor: "#000000",
        }}
      />

      {/* Global Dark Tint Overlay to ensure text readability */}
      <div className="bg-dark-overlay absolute inset-0 bg-black/85 z-10 opacity-40" />
    </div>
  );
}

