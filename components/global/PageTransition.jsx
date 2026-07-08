"use client";
import React, { useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "@/lib/gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef(null);
  const isAnimating = useRef(false);
  const isFirstMount = useRef(true);

  // Enter animation: fade overlay out after route change
  useEffect(() => {
    // Skip the very first page load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Clear any pending safety timeout from exit animation
    if (overlay.__safetyTimer) {
      clearTimeout(overlay.__safetyTimer);
      overlay.__safetyTimer = null;
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Small delay so the new page has time to render behind the overlay
    const timer = setTimeout(() => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(overlay, { visibility: "hidden" });
          isAnimating.current = false;
        },
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Intercept internal link clicks for exit animation
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Extract just the pathname portion (strip query params and hash)
      const hrefPathname = href.split("?")[0].split("#")[0];

      // Skip external, hash, mailto, tel, blank-target, and same-page links
      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#") ||
        anchor.target === "_blank" ||
        hrefPathname === pathname
      ) {
        return;
      }

      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      isAnimating.current = true;

      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(href);
        return;
      }

      // Safety timeout: if enter animation never fires (e.g. page error),
      // force-reset the overlay after 3 seconds so navigation isn't permanently stuck
      const safetyTimer = setTimeout(() => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.set(overlay, { visibility: "hidden" });
            isAnimating.current = false;
          },
        });
      }, 3000);
      overlay.__safetyTimer = safetyTimer;

      // Exit: fade overlay in, then navigate
      gsap.set(overlay, { visibility: "visible", opacity: 0 });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          router.push(href);
        },
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, router]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-[#080808] pointer-events-none"
        style={{ visibility: "hidden", opacity: 0 }}
        aria-hidden="true"
      />
      {children}
    </>
  );
}
