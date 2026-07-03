"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Hide the default cursor globally on desktop
    const style = document.createElement("style");
    style.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, [role="button"], input, textarea, select {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useGSAP(() => {
    // Check if device supports hover (desktop/laptop)
    const isHoverable = window.matchMedia("(pointer: fine)").matches;
    if (!isHoverable) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const exploreText = textRef.current;

    if (!dot || !ring) return;

    // Set initial positions offscreen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 });

    // Use quickSetter for high performance position updates
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Make them visible on first movement
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: "auto" });
      
      // Instantly track dot
      setDotX(mouseX);
      setDotY(mouseY);
    };

    // Smoothly animate the trailing ring
    const tickerUpdate = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      ringX += (mouseX - ringX) * dt;
      ringY += (mouseY - ringY) * dt;
      setRingX(ringX);
      setRingY(ringY);
    };

    window.addEventListener("mousemove", onMouseMove);
    gsap.ticker.add(tickerUpdate);

    // Mouse leave / enter window bounds
    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };
    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Hover interactions using event delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // 1. Interactive hover: Links, Buttons, Clickable items
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      
      // 2. Image hover (img tags, elements with classes containing img/image, or elements with computed background images)
      const hasBgImage = window.getComputedStyle(target).backgroundImage !== "none" ||
                          (target.parentElement && window.getComputedStyle(target.parentElement).backgroundImage !== "none");
      const isImage = target.closest("img, [class*='img'], [class*='image'], .image-hover") || hasBgImage;

      // 3. Text hover (h1, h2, h3, h4, h5, h6, p, blockquote, li, span)
      const isText = target.closest("h1, h2, h3, h4, h5, h6, p, blockquote, li, span") && !isInteractive && !isImage;

      if (isInteractive) {
        // Expand ring, shrink dot, change color
        gsap.to(ring, {
          scale: 1.8,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.8)",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.2,
          overwrite: "auto",
        });
      } else if (isImage) {
        // Expand ring significantly, show "+" indicator
        gsap.to(ring, {
          scale: 2.2,
          backgroundColor: "rgba(8, 8, 8, 0.6)",
          borderColor: "rgba(255, 255, 255, 0.8)",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.2,
          overwrite: "auto",
        });
        if (exploreText) {
          gsap.to(exploreText, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            overwrite: "auto"
          });
        }
      } else if (isText) {
        // Big solid circle for text hover (mix-blend-difference makes text turn black inside)
        gsap.to(ring, {
          scale: 2.2, // Big circle
          backgroundColor: "rgba(255, 255, 255, 1)", // Solid white
          borderColor: "transparent",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 0, // Hide center dot
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      // Reset cursor to default state
      gsap.to(ring, {
        scale: 1.0,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.4)",
        duration: 0.3,
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: 1.0,
        duration: 0.3,
        overwrite: "auto",
      });
      if (exploreText) {
        gsap.to(exploreText, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      gsap.ticker.remove(tickerUpdate);
    };
  });

  return (
    <>
      {/* Outer Trailing Ring */}
      <div
        ref={ringRef}
        className="hidden md:flex fixed top-0 left-0 w-9 h-9 rounded-full border-[1.2px] border-white/40 z-[99999] pointer-events-none items-center justify-center origin-center mix-blend-difference"
      >
        {/* Universal '+' symbol inside ring on image hover */}
        <span
          ref={textRef}
          className="text-xs font-sans font-light text-white opacity-0 select-none pointer-events-none"
        >
          +
        </span>
      </div>

      {/* Solid Inner Dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white z-[99999] pointer-events-none origin-center mix-blend-difference"
      />
    </>
  );
}
