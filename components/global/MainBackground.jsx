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

    const fadeBg = (activeLayerClass) => {
      const layers = [".bg-hero-layer", ".bg-philosophy-layer", ".bg-projects-layer", ".bg-company-layer"];
      layers.forEach(layer => {
        if (layer !== activeLayerClass) {
          gsap.to(layer, { opacity: 0, duration: 0.6, overwrite: "auto", ease: "power1.inOut" });
        }
      });
      gsap.to(activeLayerClass, { opacity: 0.99, duration: 0.6, delay: 0.2, overwrite: "auto", ease: "power1.inOut" });
    };

    const fadeAllOut = () => {
      gsap.to(".bg-image-layer", { opacity: 0, duration: 0.6, overwrite: "auto", ease: "power1.inOut" });
    };

    const updateBackgrounds = () => {
      const footerTrigger = ScrollTrigger.getById("footer");
      if (footerTrigger && footerTrigger.isActive) {
        fadeAllOut();
        return;
      }

      const activeSection = [
        { id: "hero", layer: ".bg-hero-layer" },
        { id: "philosophy", layer: ".bg-philosophy-layer" },
        { id: "projects", layer: ".bg-projects-layer" },
        { id: "company", layer: ".bg-company-layer" }
      ].find(sec => {
        const trigger = ScrollTrigger.getById(sec.id);
        return trigger && trigger.isActive;
      });

      if (activeSection) {
        fadeBg(activeSection.layer);
      } else {
        fadeAllOut();
      }
    };

    // Create ScrollTriggers and refresh after a short delay to ensure correct positioning of all pushed sections
    const triggers = [];
    const timer = setTimeout(() => {
      triggers.push(
        ScrollTrigger.create({
          id: "hero",
          trigger: "#hero",
          start: "top 50%",
          end: "bottom 50%",
          onToggle: updateBackgrounds
        })
      );

      triggers.push(
        ScrollTrigger.create({
          id: "philosophy",
          trigger: "#philosophy",
          start: "top 50%",
          end: "bottom 50%",
          onToggle: updateBackgrounds
        })
      );

      triggers.push(
        ScrollTrigger.create({
          id: "projects",
          trigger: "#projects",
          start: "top 50%",
          end: "bottom 50%",
          onToggle: updateBackgrounds
        })
      );

      triggers.push(
        ScrollTrigger.create({
          id: "company",
          trigger: "#company",
          start: "top 70%",
          end: "bottom bottom",
          onToggle: updateBackgrounds
        })
      );

      triggers.push(
        ScrollTrigger.create({
          id: "footer",
          trigger: "#footer",
          start: "top bottom",
          end: "bottom bottom",
          onToggle: updateBackgrounds
        })
      );

      updateBackgrounds();
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
      className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none"
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
          opacity: 0.99,
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
          opacity: 0,
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
          opacity: 0,
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
          opacity: 0,
          backgroundColor: "#000000",
        }}
      />

      {/* Global Dark Tint Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/85 z-10 opacity-60" />
    </div>
  );
}

