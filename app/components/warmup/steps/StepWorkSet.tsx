"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StepWorkSet({
  workSets,
  setWorkSets,
  nextStep,
  prevStep,
}: {
  workSets: { weight: number; reps: number }[];
  setWorkSets: React.Dispatch<
    React.SetStateAction<{ weight: number; reps: number }[]>
  >;
  nextStep: () => void;
  prevStep: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".step-workset-child", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-4" ref={containerRef}>
      <p className="text-neutral-400 step-workset-child">
        Enter your top work set:
      </p>

      <div className="flex gap-2 step-workset-child">
        <Input
          type="text"
          value={workSets[0]?.weight || ""}
          onChange={(e) =>
            setWorkSets([
              { ...workSets[0], weight: parseFloat(e.target.value) || 0 },
            ])
          }
          placeholder="Weight"
          className="
            bg-neutral-800 text-amber-400 border border-amber-400
            rounded-lg px-3 py-3
            focus:ring-2 focus:ring-amber-400
            transition-all duration-300
            hover:scale-105 hover:shadow-md
          "
        />
        <Input
          type="text"
          value={workSets[0]?.reps || ""}
          onChange={(e) =>
            setWorkSets([
              { ...workSets[0], reps: parseFloat(e.target.value) || 0 },
            ])
          }
          placeholder="Reps"
          className="
            bg-neutral-800 text-amber-400 border border-amber-400
            rounded-lg px-3 py-3 w-24
            focus:ring-2 focus:ring-amber-400
            transition-all duration-300
            hover:scale-105 hover:shadow-md
          "
        />
      </div>

      <div className="flex gap-3 step-workset-child">
        <Button
          onClick={prevStep}
          className="flex-1 py-3 bg-neutral-800/70 text-amber-400 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          onClick={nextStep}
          className="flex-1 py-3 bg-amber-500 text-neutral-900 hover:text-amber-400 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
