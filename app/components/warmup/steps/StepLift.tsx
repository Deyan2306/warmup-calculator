"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Lift } from "@/lib/warmup/types";
import { gsap } from "gsap";
import { JSX } from "react";
import Image from "next/image";

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
        <Image
          src="/sbd/squat.webp"
          alt="Squat"
          width={24}
          height={24}
          className="object-contain"
        />
      ),
    },
    {
      type: "bench",
      icon: (
        <Image
          src="/sbd/bench.webp"
          alt="Bench"
          width={24}
          height={24}
          className="object-contain"
        />
      ),
    },
    {
      type: "deadlift",
      icon: (
        <Image
          src="/sbd/deadlift.webp"
          alt="Deadlift"
          width={24}
          height={24}
          className="object-contain"
        />
      ),
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []); // run once on mount

  return (
    <div className="space-y-4">
      <p className="text-neutral-400 font-semibold text-lg">Select the lift:</p>

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
