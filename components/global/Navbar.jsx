"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { siteContent } from "@/lib/content";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const displayTextRef = React.useRef("");
  const isVisibleRef = React.useRef(false);

  const [delhiTime, setDelhiTime] = useState("00 00 00");
  const [newYorkTime, setNewYorkTime] = useState("00 00 00");

  const getTzTime = (offsetHours) => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const tzDate = new Date(utc + 3600000 * offsetHours);
    const h = String(tzDate.getHours()).padStart(2, "0");
    const m = String(tzDate.getMinutes()).padStart(2, "0");
    const s = String(tzDate.getSeconds()).padStart(2, "0");
    return `${h} ${m} ${s}`;
  };

  useEffect(() => {
    const updateTimes = () => {
      setDelhiTime(getTzTime(siteContent.global.addresses.newDelhi.timezone));
      setNewYorkTime(getTzTime(siteContent.global.addresses.newYork.timezone));
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateDisplayText = (val) => {
    displayTextRef.current = val;
    setDisplayText(val);
  };

  const updateVisibility = (val) => {
    isVisibleRef.current = val;
    setIsVisible(val);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section indicator scroll detection
      const sections = ["hero", "philosophy", "projects", "company"];
      let currentSection = "hero";
      const triggerPoint = window.innerHeight * 0.4; // 40% of viewport height

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isMenuOpen || activeSection === "hero") {
      updateVisibility(false);
      return;
    }

    const labels = {
      philosophy: "philosophy",
      projects: "projects",
      company: "company",
    };
    const newLabel = labels[activeSection] || activeSection;

    if (displayTextRef.current === "") {
      updateDisplayText(newLabel);
      updateVisibility(true);
    } else if (displayTextRef.current !== newLabel) {
      updateVisibility(false);
      const timer = setTimeout(() => {
        updateDisplayText(newLabel);
        updateVisibility(true);
      }, 300);
      return () => clearTimeout(timer);
    } else if (!isVisibleRef.current) {
      updateVisibility(true);
    }
  }, [activeSection, isMenuOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-700 py-8 md:py-12 px-4 sm:px-8 md:px-16 flex justify-between items-start bg-transparent border-b border-white/0 mix-blend-difference"
      >
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <Link href="/" className="text-white hover:opacity-85 transition-opacity">
            <Logo className="w-10 h-20 md:w-12 md:h-24" />
          </Link>
          
          <div
            className={`font-serif text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#908e8b] select-none pointer-events-none transition-all duration-300 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
            style={{ writingMode: "vertical-lr" }}
          >
            {displayText}
          </div>
        </div>

        <div className="flex items-center gap-32 font-sans text-xs uppercase tracking-[0.2em]">
          {/* Language Picker with Dots (Active Only) */}
          <div className="flex items-start gap-3.5 text-muted select-none text-[10px] tracking-[0.25em]">
            {/* EN */}
            <button
              onClick={() => setActiveLang("en")}
              className="flex flex-col items-center gap-2 focus:outline-none cursor-pointer group/lang"
            >
              <span
                className={`w-1 h-1 rounded-full bg-white transition-all duration-300 ${
                  activeLang === "en" ? "opacity-40 scale-100" : "opacity-0 scale-0"
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
                  activeLang === "en" ? "text-[#e6e4e2] font-semibold" : "text-[#908e8b] hover:text-white"
                }`}
              >
                en
              </span>
            </button>
            
            <span className="text-white/10 mt-[10px] text-[9px]">|</span>
            
            {/* HI */}
            <button
              onClick={() => setActiveLang("hi")}
              className="flex flex-col items-center gap-2 focus:outline-none cursor-pointer group/lang"
            >
              <span
                className={`w-1 h-1 rounded-full bg-white transition-all duration-300 ${
                  activeLang === "hi" ? "opacity-40 scale-100" : "opacity-0 scale-0"
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
                  activeLang === "hi" ? "text-[#e6e4e2] font-semibold" : "text-[#908e8b] hover:text-white"
                }`}
              >
                hi
              </span>
            </button>
          </div>

          {/* Menu Button with Dot and Strikethrough Hover */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center gap-2 text-white z-50 relative focus:outline-none cursor-pointer group"
            aria-label="Toggle Menu"
          >
            <span className="w-1 h-1 rounded-full bg-white/30 transition-transform duration-300" />
            <span className="font-semibold text-[10px] tracking-[0.25em] relative block py-0.5">
              {isMenuOpen ? "CLOSE" : "MENU"}
              <span className="absolute left-0 top-1/2 w-full h-[1px] bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`navbar-menu-overlay fixed inset-0 bg-[#080808] z-40 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] px-8 md:px-24 py-24 md:py-32 ${
          isMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.02]">
          <div className="border-r border-white h-full" />
          <div className="border-r border-white h-full" />
          <div className="border-r border-white h-full" />
          <div className="h-full" />
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center mt-12 w-full max-w-7xl mx-auto h-full gap-12">
          <div className="flex flex-col gap-8 md:gap-12 text-left z-10">

            {/* HOME SECTION */}
            <div className="flex flex-col gap-4 md:gap-6">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-4xl md:text-6xl text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors uppercase block relative group w-fit"
              >
                <span className="inline-block relative">
                  Home
                  <span className="absolute left-0 top-1/2 w-full h-[2px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
              </Link>
            </div>
            
            {/* PROJECTS SECTION */}
            <div className="flex flex-col gap-4 md:gap-6">
              <Link
                href="/projects"
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-4xl md:text-6xl text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors uppercase block relative group w-fit"
              >
                <span className="inline-block relative">
                  projects
                  <span className="absolute left-0 top-1/2 w-full h-[2px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
              </Link>
            </div>

            {/* COMPANY SECTION */}
            <div>
              <Link
                href="/company"
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-4xl md:text-6xl text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors uppercase block relative group w-fit"
              >
                <span className="inline-block relative">
                  company
                  <span className="absolute left-0 top-1/2 w-full h-[2px] bg-[#d4c3b3] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 text-left text-[10px] uppercase tracking-[0.2em] text-[#908e8b] max-w-md z-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-[#e6e4e2] font-semibold">{siteContent.global.addresses.newDelhi.title}</span>
                <span className="font-mono text-[10px] text-[#e6e4e2]/60 font-light select-none tracking-widest">{delhiTime}</span>
              </div>
              <p className="normal-case leading-relaxed font-sans font-light text-[11px] text-[#908e8b] max-w-[200px]">
                {siteContent.global.addresses.newDelhi.line1},<br />
                {siteContent.global.addresses.newDelhi.line2}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-[#e6e4e2] font-semibold">{siteContent.global.addresses.newYork.title}</span>
                <span className="font-mono text-[10px] text-[#e6e4e2]/60 font-light select-none tracking-widest">{newYorkTime}</span>
              </div>
              <p className="normal-case leading-relaxed font-sans font-light text-[11px] text-[#908e8b] max-w-[200px]">
                {siteContent.global.addresses.newYork.line1},<br />
                {siteContent.global.addresses.newYork.line2}
              </p>
            </div>
          </div>
        </div>

        {/* Footer info inside menu */}
        <div className="flex justify-between items-center text-[10px] text-[#908e8b] tracking-[0.2em] w-full max-w-7xl mx-auto z-10 mt-8 pt-6">
          <span>©{new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <a href={siteContent.global.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">WHATSAPP</a>
            <a href={siteContent.global.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">INSTAGRAM</a>
          </div>
        </div>
      </div>
    </>
  );
}
