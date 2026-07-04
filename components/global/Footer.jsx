"use client";
import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const [dubaiTime, setDubaiTime] = useState("00:00:00");
  const [tokyoTime, setTokyoTime] = useState("00:00:00");

  const getTzTime = (offsetHours) => {
    const date = new Date();
    // Get UTC milliseconds
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    // Apply timezone offset hours
    const tzDate = new Date(utc + 3600000 * offsetHours);

    const h = String(tzDate.getHours()).padStart(2, "0");
    const m = String(tzDate.getMinutes()).padStart(2, "0");
    const s = String(tzDate.getSeconds()).padStart(2, "0");

    return `${h} ${m} ${s}`;
  };

  useEffect(() => {
    const updateTimes = () => {
      setDubaiTime(getTzTime(5.5)); // IST (UTC+5.5)
      setTokyoTime(getTzTime(-4));  // EDT (UTC-4)
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const footerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hierarchical scroll-reveal for footer sections
  useGSAP(() => {
    const sections = footerRef.current?.querySelectorAll(".footer-reveal");
    if (sections && sections.length > 0) {
      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      sections.forEach((el, i) => {
        footerTl.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          i * 0.2
        );
      });
    }
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} id="footer" className="w-full bg-transparent text-[#e6e4e2] px-6 md:px-12 py-16 md:py-24 font-sans relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Upper Footer: Logo and Contact Title */}
        <div className="footer-reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12">
          <div className="flex items-center gap-1">
            <Logo className="w-10 h-20 md:w-12 md:h-24" />
          </div>
          
          <div className="relative group">
            <a href="#contact" className="font-serif text-5xl md:text-7xl text-[#e6e4e2] hover:text-[#d4c3b3] transition-colors lowercase block relative">
              contact
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#d4c3b3] group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          </div>
        </div>

        {/* Middle Footer: Sitemap, Addresses, Socials */}
        <div className="footer-reveal grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] uppercase tracking-[0.2em] text-[#908e8b]">
          {/* Sitemap */}
          <div className="flex flex-col gap-4">
            <span className="text-white/20 select-none">sitemap</span>
            <ul className="flex flex-col gap-3 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">home</Link>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">philosophy</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">projects</a>
              </li>
              <li>
                <a href="#company" className="hover:text-white transition-colors">company</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">contact</a>
              </li>
            </ul>
          </div>

          {/* Address New Delhi */}
          <div className="flex flex-col gap-4">
            <span className="text-white/20 select-none">new delhi</span>
            <div className="normal-case leading-relaxed font-light text-[11px]">
              <span className="uppercase text-[10px] tracking-[0.2em] font-medium block mb-2 text-[#e6e4e2]">5th floor, dlf centre</span>
              sansad marg,<br />
              new delhi, ind
            </div>
          </div>

          {/* Address New York */}
          <div className="flex flex-col gap-4">
            <span className="text-white/20 select-none">new york</span>
            <div className="normal-case leading-relaxed font-light text-[11px]">
              <span className="uppercase text-[10px] tracking-[0.2em] font-medium block mb-2 text-[#e6e4e2]">120 broadway</span>
              suite 3600,<br />
              new york, ny, usa
            </div>
          </div>

          {/* Socials & Policies */}
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-white/20 select-none">connect</span>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="https://wa.me/#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    whatsapp
                    <svg className="w-3.5 h-3.5 fill-current text-current opacity-70" viewBox="0 0 16 16">
                      <path d="M8 0C3.58178 0 0 3.58178 0 8C0 9.45356 0.387778 10.8167 1.06533 11.9913L0 16L4.156 15.0176C5.29689 15.6438 6.60667 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58178 12.4182 0 8 0ZM8 14.5671C6.66289 14.5671 5.41933 14.1676 4.38178 13.4811L1.92644 14.1064L2.61511 11.7596C1.87 10.6944 1.43289 9.39822 1.43289 7.99978C1.43289 4.37289 4.37311 1.43267 8 1.43267C11.6269 1.43267 14.5671 4.37289 14.5671 7.99978C14.5671 11.6267 11.6269 14.5669 8 14.5669V14.5671Z" />
                      <path d="M9.87439 9.05553L11.81 9.96797C11.8988 10.0098 11.9557 10.1 11.9477 10.1978C11.9268 10.4524 11.8246 10.9629 11.3671 11.4204C10.0755 12.712 7.75617 11.2506 7.66173 11.1942C7.09128 10.8878 6.54928 10.4778 6.03528 9.96397C5.52128 9.4502 5.11128 8.90797 4.80484 8.33753C4.74817 8.24331 3.28684 5.92397 4.57862 4.6322C5.03617 4.17464 5.54662 4.07242 5.80128 4.05153C5.89928 4.04353 5.98928 4.10042 6.03106 4.18931L6.94373 6.12486C6.98684 6.21642 6.96795 6.32531 6.89639 6.39686L6.21617 7.07708C6.06906 7.2242 6.02595 7.45331 6.12728 7.63508C6.37551 8.0802 6.70928 8.50886 7.09595 8.90331C7.49039 9.28997 7.91906 9.62397 8.36417 9.87197C8.54595 9.97331 8.77484 9.9302 8.92217 9.78308L9.60239 9.10286C9.67395 9.03131 9.78284 9.0122 9.87439 9.05553Z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    instagram
                    <svg className="w-3.5 h-3.5 fill-current text-current opacity-70" viewBox="0 0 16 16">
                      <path d="M8 1.44257C10.1362 1.44257 10.389 1.45082 11.2328 1.48924C12.0127 1.52481 12.4363 1.655 12.7183 1.76455C13.0662 1.89264 13.3809 2.09718 13.6392 2.3631C13.9052 2.62139 14.1098 2.93608 14.2379 3.28396C14.3474 3.56593 14.4776 3.98952 14.5132 4.76939C14.5516 5.61308 14.5599 5.86584 14.5599 8.00191C14.5599 10.138 14.5516 10.3907 14.5132 11.2344C14.4776 12.0143 14.3474 12.4379 14.2379 12.7199C14.1046 13.0648 13.9007 13.378 13.6393 13.6394C13.3778 13.9009 13.0645 14.1048 12.7196 14.238C12.4376 14.3475 12.014 14.4777 11.234 14.5133C10.3906 14.5517 10.1375 14.56 8.00127 14.56C5.86504 14.56 5.61194 14.5517 4.7685 14.5133C3.98857 14.4777 3.56494 14.3475 3.28295 14.238C2.93504 14.1099 2.62033 13.9054 2.36202 13.6394C2.09608 13.3811 1.89152 13.0665 1.76342 12.7186C1.65386 12.4366 1.52366 12.013 1.48809 11.2332C1.44967 10.3895 1.44141 10.1367 1.44141 8.00064C1.44141 5.86457 1.44967 5.61181 1.48809 4.76812C1.52366 3.98825 1.65386 3.56466 1.76342 3.28269C1.89152 2.93481 2.09608 2.62012 2.36202 2.36183C2.62033 2.09591 2.93504 1.89137 3.28295 1.76328C3.56494 1.65373 3.98857 1.52354 4.7685 1.48797C5.61226 1.44955 5.86504 1.4413 8.00127 1.4413L8 1.44257ZM8.00127 0C5.82852 0 5.55605 0.00920854 4.70276 0.0482655C3.84948 0.0873224 3.26834 0.223545 2.76024 0.421053C2.22629 0.622036 1.74254 0.936924 1.34265 1.34381C0.935728 1.74368 0.620815 2.22739 0.419816 2.76129C0.222293 3.26935 0.0870117 3.85171 0.0482693 4.70302C0.00952683 5.55434 0 5.82805 0 8.00064C0 10.1732 0.00920927 10.4457 0.0482693 11.2989C0.0873293 12.1521 0.222293 12.7319 0.419816 13.24C0.620897 13.7737 0.935805 14.2571 1.34265 14.6568C1.74241 15.064 2.22619 15.379 2.76024 15.5799C3.26834 15.7777 3.85075 15.913 4.70213 15.9517C5.55351 15.9905 5.82788 16 8.00063 16C10.1734 16 10.4459 15.9908 11.2991 15.9517C12.1524 15.9127 12.7317 15.7777 13.2398 15.5799C13.7714 15.3745 14.2542 15.0603 14.6572 14.6573C15.0602 14.2543 15.3745 13.7716 15.5799 13.24C15.7777 12.7319 15.913 12.1496 15.9517 11.2982C15.9905 10.4469 16 10.1726 16 8C16 5.82742 15.9908 5.55497 15.9517 4.70175C15.9127 3.84854 15.7777 3.26935 15.5799 2.76129C15.379 2.22757 15.0642 1.74406 14.6574 1.34445C14.2575 0.93733 13.7738 0.622222 13.2398 0.421053C12.7317 0.223545 12.1493 0.088275 11.2979 0.0495356C10.4465 0.0107962 10.1728 0.00127014 8 0.00127014L8.00127 0Z" />
                      <path d="M7.99994 3.89355C7.18746 3.89355 6.39323 4.13446 5.71768 4.58582C5.04212 5.03717 4.51559 5.6787 4.20467 6.42927C3.89375 7.17985 3.8124 8.00575 3.9709 8.80256C4.12941 9.59936 4.52066 10.3313 5.09517 10.9057C5.66968 11.4802 6.40165 11.8714 7.19852 12.0299C7.99539 12.1884 8.82136 12.1071 9.572 11.7962C10.3226 11.4853 10.9642 10.9588 11.4156 10.2833C11.867 9.60778 12.1079 8.81361 12.1079 8.0012C12.108 7.46176 12.0017 6.9276 11.7953 6.42922C11.5889 5.93084 11.2863 5.478 10.9048 5.09656C10.5233 4.71512 10.0705 4.41256 9.57205 4.20615C9.07363 3.99973 8.53942 3.89351 7.99994 3.89355ZM7.99994 10.6685C7.47236 10.6685 6.95662 10.5121 6.51795 10.219C6.07928 9.92589 5.73738 9.50932 5.53548 9.02193C5.33358 8.53454 5.28076 7.99824 5.38368 7.48083C5.48661 6.96343 5.74067 6.48816 6.11373 6.11513C6.48678 5.7421 6.96209 5.48807 7.47954 5.38515C7.99699 5.28223 8.53333 5.33505 9.02076 5.53693C9.50818 5.73882 9.92479 6.08069 10.2179 6.51933C10.511 6.95796 10.6675 7.47366 10.6675 8.0012C10.6675 8.70861 10.3864 9.38705 9.88616 9.88727C9.38591 10.3875 8.70741 10.6685 7.99994 10.6685Z" />
                      <path d="M12.2707 4.69033C12.8008 4.69033 13.2306 4.26056 13.2306 3.73042C13.2306 3.20027 12.8008 2.77051 12.2707 2.77051C11.7405 2.77051 11.3107 3.20027 11.3107 3.73042C11.3107 4.26056 11.7405 4.69033 12.2707 4.69033Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            
            <a href="#privacy" className="hover:text-white transition-colors block mt-4">
              privacy policy
            </a>
          </div>
        </div>

        {/* Bottom Footer: Copyright, Clocks, Back to Top */}
        <div className="footer-reveal flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 text-[9px] uppercase tracking-[0.25em] text-[#908e8b]">
          <div>
            <span>©{new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap gap-x-16 md:gap-x-24 gap-y-2 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-white">{dubaiTime}</span>
              <span className="text-[#908e8b] font-sans text-[8px] tracking-widest">ist, new delhi ind</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">{tokyoTime}</span>
              <span className="text-[#908e8b] font-sans text-[8px] tracking-widest">edt, new york usa</span>
            </div>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors focus:outline-none flex items-center gap-2 cursor-pointer font-medium"
            >
              top
              <span className="text-xs">↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
