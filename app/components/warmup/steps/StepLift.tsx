"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Lift } from "@/lib/warmup/types";
import { gsap } from "gsap";
import { JSX } from "react";

export default function StepLift({
  lift,
  setLift,
  nextStep,
}: {
  lift?: Lift;
  setLift: (l: Lift) => void;
  nextStep: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const lifts: { type: Lift; icon: JSX.Element }[] = [
    {
      type: "squat",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0V8H6a1 1 0 110-2h3V3a1 1 0 011-1z" />
        </svg>
      ),
    },
    {
      type: "bench",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 12h16v2H2v-2zM4 8h12v2H4V8z" />
        </svg>
      ),
    },
    {
      type: "deadlift",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 2h10v2H5V2zM3 10h14v2H3v-2z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      // Animate the wrapper div instead of individual buttons
      gsap.from(containerRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [containerRef.current]); // Run whenever container mounts

  return (
    <div className="space-y-4">
      <p className="text-neutral-300 font-semibold text-lg">Select the lift:</p>

      <div className="flex gap-3" ref={containerRef}>
        {lifts.map((l) => (
          <div key={l.type} className="flex-1">
            <Button
              onClick={() => {
                setLift(l.type);
                nextStep();
              }}
              className={`
              w-full py-3 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 transform flex items-center justify-center gap-2
              ${
                lift === l.type
                  ? "bg-amber-500 text-neutral-900 scale-105 shadow-lg"
                  : "bg-neutral-800/70 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105 hover:shadow-md"
              }
            `}
            >
              {l.icon}
              <span>{l.type.charAt(0).toUpperCase() + l.type.slice(1)}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
