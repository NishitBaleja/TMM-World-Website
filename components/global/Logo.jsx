import React from "react";
import Image from "next/image";
import logoImg from "@/public/images/tmm-world-logo.webp";

export default function Logo({ className = "w-10 h-20" }) {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <Image
        src={logoImg}
        alt="TMMWORLD Logo"
        fill
        sizes="(max-width: 768px) 100px, 200px"
        className="object-contain"
        priority
      />
    </div>
  );
}
