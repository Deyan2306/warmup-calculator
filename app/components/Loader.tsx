"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        rotate: 360,
        repeat: -1,
        duration: 2,
        ease: "linear",
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div
          ref={logoRef}
          className="w-24 h-24 relative rounded-full overflow-hidden shadow-2xl shadow-amber-500/50"
        >
          <Image
            src="/pumped-up-logo.webp"
            alt="Loader Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Glow ring */}
        <div className="w-24 h-24 rounded-full absolute animate-ping bg-amber-400/30 -mt-24"></div>

        {/* Loading text */}
        <p className="text-amber-400 font-bold text-lg animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
