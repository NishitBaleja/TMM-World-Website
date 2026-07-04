"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { siteContent } from "@/lib/content";

// Constants for assets to allow easy swapping later
const PROJ_IMG_01 = "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1000"; // Parent and child / education
const PROJ_IMG_02 = "https://images.unsplash.com/photo-1576016770956-debb63d900bb?auto=format&fit=crop&q=80&w=1000"; // Japanese ceramics / teapot
const PROJ_IMG_03 = "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1000"; // Quiet flame / candle light / retreat and healing

export default function Projects() {
  const containerRef = useRef(null);
  const desktopPinRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Horizontal pin scroll layout for tablet/desktop
    mm.add("(min-width: 768px)", () => {
      const slides = gsap.utils.toArray(".project-slide");
      
      let activeIndex = 0;
      let isAnimating = false;
      let isActive = false;
      let touchStartX = 0;
      let touchStartY = 0;

      const bgNames = ["projectsCover", "practice1", "practice2", "practice3"];

      const dispatchBgChange = (index) => {
        window.dispatchEvent(
          new CustomEvent("active-bg-change", { detail: bgNames[index] })
        );
      };

      // Create timeline for pinning, horizontal scrolling, and background fades
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopPinRef.current,
          pin: true,
          scrub: 0.2,
          start: "top top",
          end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / 3,
            duration: { min: 0.5, max: 1.2 }, // Slower snapping animation
            delay: 0.05,
            ease: "power2.out"
          },
          onEnter: () => {
            isActive = true;
            activeIndex = 0;
            dispatchBgChange(0);
          },
          onLeave: () => {
            isActive = false;
          },
          onEnterBack: () => {
            isActive = true;
            activeIndex = 3;
            dispatchBgChange(3);
          },
          onLeaveBack: () => {
            isActive = false;
          },
          onUpdate: (self) => {
            if (!isAnimating) {
              const nextIndex = Math.round(self.progress * 3);
              if (nextIndex !== activeIndex) {
                activeIndex = nextIndex;
                dispatchBgChange(activeIndex);
              }
            }
          }
        },
      });

      const goToSlide = (index) => {
        if (isAnimating) return;
        if (index < 0 || index > 3) return;

        const scrollTriggerInstance = tl.scrollTrigger;
        if (!scrollTriggerInstance) return;

        isAnimating = true;
        const scrollStart = scrollTriggerInstance.start;
        const scrollEnd = scrollTriggerInstance.end;
        const scrollDistance = scrollEnd - scrollStart;
        const targetScroll = scrollStart + index * (scrollDistance / 3);

        activeIndex = index;
        dispatchBgChange(index);

        if (window.lenis) {
          window.lenis.stop(); // Lock user input
          window.lenis.scrollTo(targetScroll, {
            duration: 1.4, // Slower snapping animation
            force: true, // Force scroll even when stopped
            onComplete: () => {
              window.lenis.start(); // Unlock user input
              isAnimating = false;
            }
          });
        } else {
          const scrollObj = { y: window.scrollY };
          gsap.to(scrollObj, {
            y: targetScroll,
            duration: 1.4, // Slower snapping animation
            ease: "power2.out",
            onUpdate: () => window.scrollTo(0, scrollObj.y),
            onComplete: () => {
              isAnimating = false;
            }
          });
        }
      };

      const handleWheel = (e) => {
        if (!isActive) return;
        
        const deltaX = e.deltaX;
        const deltaY = e.deltaY;
        const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

        if (isAnimating) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        if (Math.abs(delta) < 5) return;

        if (delta > 0) {
          if (activeIndex < 3) {
            if (e.cancelable) e.preventDefault();
            goToSlide(activeIndex + 1);
          }
        } else if (delta < 0) {
          if (activeIndex > 0) {
            if (e.cancelable) e.preventDefault();
            goToSlide(activeIndex - 1);
          }
        }
      };

      const handleTouchStart = (e) => {
        if (!isActive) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        if (!isActive) return;
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;

        if (isAnimating) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        const maxDelta = Math.max(absX, absY);

        if (maxDelta > 40) {
          const delta = absX > absY ? deltaX : deltaY;
          if (delta > 0) {
            if (activeIndex < 3) {
              if (e.cancelable) e.preventDefault();
              goToSlide(activeIndex + 1);
            }
          } else {
            if (activeIndex > 0) {
              if (e.cancelable) e.preventDefault();
              goToSlide(activeIndex - 1);
            }
          }
          touchStartX = touchEndX;
          touchStartY = touchEndY;
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });

      // Animate track horizontally over the entire timeline duration of 1.0
      tl.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        duration: 1.0,
      }, 0);

      // Desktop background is handled dynamically via events dispatched in scrollTrigger config

      // Scroll-reveal for cover slide text (hierarchical via timeline)
      const coverSlide = desktopPinRef.current?.querySelector(".project-slide");
      if (coverSlide) {
        const coverH2 = coverSlide.querySelector("h2");
        const coverP = coverSlide.querySelector("p");
        const coverTl = gsap.timeline({
          scrollTrigger: {
            trigger: coverSlide,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
        if (coverH2) {
          coverTl.fromTo(coverH2, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
          }, 0);
        }
        if (coverP) {
          coverTl.fromTo(coverP, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 1, ease: "power2.out",
          }, 0.3);
        }
      }

      // Subtle parallax for images inside slides
      slides.forEach((slide) => {
        const img = slide.querySelector(".project-img");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    });

    // Vertical fade-in entry and background transitions for mobile layout
    mm.add("(max-width: 767px)", () => {
      const mobileSlides = gsap.utils.toArray(".mobile-project-card");
      
      // Mobile cover ScrollTrigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "top 10%",
        onToggle: (self) => {
          if (self.isActive) {
            window.dispatchEvent(
              new CustomEvent("active-bg-change", { detail: "projectsCover" })
            );
          }
        }
      });

      // Mobile cards scroll entry animations with hierarchical text reveal
      mobileSlides.forEach((card) => {
        // Use a timeline per card for reliable sequential reveal
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Card fade in first
        cardTl.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          0
        );

        // Hierarchical text reveal within each mobile card
        const textEls = card.querySelectorAll("h3, p, a");
        textEls.forEach((el, i) => {
          cardTl.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.2 + i * 0.12
          );
        });
      });

      // Mobile background transitions between cards
      mobileSlides.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) {
              window.dispatchEvent(
                new CustomEvent("active-bg-change", { detail: `practice${index + 1}` })
              );
            }
          }
        });
      });
    });

    // Recalculate ScrollTrigger triggers after both layouts have mounted/setup
    ScrollTrigger.refresh();

    return () => mm.revert();
  }, { scope: containerRef });

  const practices = siteContent.home.services;

  return (
    <div ref={containerRef} id="projects" className="bg-transparent">
      
      {/* Desktop Horizontal Scroll Layout */}
      <div ref={desktopPinRef} className="hidden md:block w-full h-screen overflow-hidden relative">
        <div ref={trackRef} className="flex h-full w-[400vw] flex-row items-center">
          
          {/* Section Cover Slide */}
          <div className="project-slide w-screen h-screen flex flex-col justify-center px-12 lg:px-24 relative">
            
            <div className="max-w-4xl select-none text-left flex flex-col gap-8">
              <h2 className="font-serif text-5xl lg:text-7xl text-[#e6e4e2] leading-[1.2] font-light tracking-wide lowercase">
                <span className="block webgl-distort-text">engineering the</span>
                <span className="block webgl-distort-text">systems of scale</span>
              </h2>
              <p className="text-sm lg:text-base leading-relaxed text-[#908e8b] font-light max-w-lg">
                through three core disciplines, tmmworld designs resilient cloud backends, high-fidelity tactile frontends, and automated neural intelligence pipelines.
              </p>
            </div>
          </div>

          {/* Cards Slides */}
          {practices.map((practice) => (
            <div
              key={practice.num}
              className="project-slide w-screen h-screen flex items-center justify-center px-12 lg:px-24 relative"
            >
              <div className="grid grid-cols-12 gap-12 items-center w-full max-w-7xl">
                
                {/* Text Column */}
                <div className="col-span-5 flex flex-col gap-6 text-left">
                  <div className="flex items-baseline gap-4 select-none">
                    <span className="font-mono text-xs text-[#908e8b]">{practice.num}</span>
                    <h3 className="font-serif text-4xl lg:text-5xl text-[#e6e4e2] font-light lowercase webgl-distort-text">
                      {practice.name}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-4 max-w-md">
                    <p className="font-serif text-lg text-[#e6e4e2] leading-snug font-light italic">
                      {practice.lead}
                    </p>
                    <p className="text-xs lg:text-sm leading-relaxed text-[#908e8b] font-light">
                      {practice.description}
                    </p>
                  </div>

                  <div className="pt-4 relative group w-fit">
                    <a
                      href={practice.href}
                      className="font-serif text-sm lg:text-base text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
                    >
                      view {practice.name}
                      <span className="absolute left-0 top-1/2 w-full h-[1px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </a>
                  </div>
                </div>

                {/* Media Image Column */}
                <div className="col-span-7 flex justify-center items-center">
                  <div className="w-full max-w-lg aspect-[3/4] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center group">
                    <div
                      className="project-img absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 webgl-distort-image"
                      style={{
                        backgroundImage: practice.img ? `url(${practice.img})` : "none",
                        backgroundColor: "#0d0d0d"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <span className="font-serif text-xs text-white/10 select-none z-0">{practice.label} placeholder</span>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="block md:hidden px-6 py-20">
        <div className="flex flex-col gap-12">
          
          {/* Mobile Cover Intro */}
          <div className="flex flex-col gap-6 text-left">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#908e8b] font-medium block">
              services
            </span>
            <h2 className="font-serif text-3xl text-[#e6e4e2] leading-[1.3] font-light tracking-wide lowercase">
              engineering the systems of scale
            </h2>
            <p className="text-xs leading-relaxed text-[#908e8b] font-light">
              through three core disciplines, tmmworld designs resilient cloud backends, high-fidelity tactile frontends, and automated neural intelligence pipelines.
            </p>
          </div>

          {/* Mobile List Cards */}
          <div className="flex flex-col gap-16 mt-6">
            {practices.map((practice) => (
              <div
                key={practice.num}
                className="mobile-project-card flex flex-col gap-6 text-left pt-8"
              >
                <div className="w-full aspect-[4/5] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: practice.img ? `url(${practice.img})` : "none",
                    }}
                  />
                  <span className="font-serif text-xs text-white/10 select-none">{practice.label} placeholder</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-[#908e8b]">{practice.num}</span>
                    <h3 className="font-serif text-2xl text-[#e6e4e2] font-light lowercase">
                      {practice.name}
                    </h3>
                  </div>
                  
                  <p className="font-serif text-sm text-[#e6e4e2] font-light italic">
                    {practice.lead}
                  </p>
                  <p className="text-xs leading-relaxed text-[#908e8b] font-light">
                    {practice.description}
                  </p>

                  <div className="pt-2 relative group w-fit">
                    <a
                      href={practice.href}
                      className="font-serif text-xs text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors pb-1 lowercase block relative"
                    >
                      view {practice.name}
                      <span className="absolute left-0 top-1/2 w-full h-[1px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
