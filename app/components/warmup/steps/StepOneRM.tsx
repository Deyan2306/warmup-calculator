"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lift } from "@/lib/warmup/types";
import { Info } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";

export default function StepOneRM({
  lift,
  oneRMs,
  setOneRMs,
  nextStep,
  prevStep,
}: {
  lift: Lift;
  oneRMs: Record<Lift, number>;
  setOneRMs: React.Dispatch<React.SetStateAction<Record<Lift, number>>>;
  nextStep: () => void;
  prevStep: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".step-one-child", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex items-center justify-between relative step-one-child">
        <p className="text-neutral-300 font-semibold text-lg">
          Enter your current 1RM for {lift.toUpperCase()}:
        </p>

        <Link
          href={`/estimate-one-rep-max?lift=${encodeURIComponent(lift)}`}
          className="group relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-amber-400 hover:text-amber-300 hover:bg-neutral-700 hover:cursor-pointer hover:scale-110 transition-transform duration-200 bg-transparent"
          >
            <Info className="h-5 w-5" />
          </Button>

          <span className="absolute z-50 -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-neutral-300 bg-neutral-900 border border-neutral-700 px-2 py-1 rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            Calculate your one rep max
          </span>
        </Link>
      </div>

      <Input
        type="text"
        value={oneRMs[lift]}
        onChange={(e) =>
          setOneRMs((s) => ({
            ...s,
            [lift]: parseFloat(e.target.value) || 0,
          }))
        }
        placeholder={`${lift.toUpperCase()} 1RM`}
        className="
          bg-neutral-800 text-amber-400 border border-amber-400
          rounded-lg px-3 py-3
          focus:ring-2 focus:ring-amber-400
          transition-all duration-300
          hover:scale-105 hover:shadow-md
          step-one-child
        "
      />

      <div className="flex gap-3 step-one-child">
        <Button
          onClick={prevStep}
          className="flex-1 py-3 bg-neutral-800/70 text-amber-400 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          className="flex-1 py-3 bg-amber-500 text-neutral-900 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
