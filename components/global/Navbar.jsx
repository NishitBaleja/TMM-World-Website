"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-700 py-6 md:py-8 px-6 md:px-12 flex justify-between items-start bg-transparent border-b border-white/0 mix-blend-difference"
      >
        <Link href="/" className="text-white hover:opacity-85 transition-opacity">
          <Logo className="w-10 h-20 md:w-12 md:h-24" />
        </Link>

        <div className="flex items-center gap-16 font-sans text-xs uppercase tracking-[0.2em]">
          <div className="hidden sm:flex gap-4 text-muted select-none">
            <span className="text-[#e6e4e2] font-semibold cursor-pointer">en</span>
            <span className="text-white/10">|</span>
            <span className="hover:text-white transition-colors cursor-pointer text-[#908e8b]">hi</span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity z-50 relative focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className="font-semibold text-[10px] tracking-[0.25em]">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </span>
            <div className="flex flex-col gap-1.5 justify-center items-center w-5 h-5">
              <span
                className={`block w-5 h-[1.2px] bg-white transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[5.2px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.2px] bg-white transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[2px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#080808] z-40 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] px-8 md:px-24 py-24 md:py-32 ${
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

             {/* PROJECTS SECTION */}
            <div className="flex flex-col gap-4 md:gap-6">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-4xl md:text-6xl text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors uppercase block relative group w-fit"
              >
                <span className="inline-block relative">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4c3b3] group-hover:w-full transition-all duration-500 ease-out" />
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
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4c3b3] group-hover:w-full transition-all duration-500 ease-out" />
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
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4c3b3] group-hover:w-full transition-all duration-500 ease-out" />
                </span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 text-left text-[10px] uppercase tracking-[0.2em] text-[#908e8b] max-w-md z-10">
            <div className="flex flex-col gap-4">
              <span className="text-[#e6e4e2] font-semibold">new delhi</span>
              <p className="normal-case leading-relaxed font-sans font-light text-[11px] text-[#908e8b] max-w-[200px]">
                5th floor, dlf centre,<br />
                sansad marg,<br />
                new delhi, ind
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[#e6e4e2] font-semibold">new york</span>
              <p className="normal-case leading-relaxed font-sans font-light text-[11px] text-[#908e8b] max-w-[200px]">
                120 broadway,<br />
                suite 3600,<br />
                new york, ny, usa
              </p>
            </div>
          </div>
        </div>

        {/* Footer info inside menu */}
        <div className="flex justify-between items-center text-[10px] text-[#908e8b] tracking-[0.2em] w-full max-w-7xl mx-auto z-10 mt-8 border-t border-white/5 pt-6">
          <span>©{new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <a href="https://wa.me/#" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">WHATSAPP</a>
            <a href="https://instagram.com/#" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">INSTAGRAM</a>
          </div>
        </div>
      </div>
    </>
  );
}
