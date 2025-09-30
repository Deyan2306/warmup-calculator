"use client";
import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { WarmupMethod } from "@/lib/warmup/types";
import ConfirmModal from "../../ConfirmModal";
import { gsap } from "gsap";

export default function StepMethod({
  method,
  setMethod,
  nextStep,
  prevStep,
  reps,
  suggestedMethods = [] as WarmupMethod[],
  setConfirmMethod,
}: {
  method: WarmupMethod | undefined;
  setMethod: (m: WarmupMethod) => void;
  nextStep: () => void;
  prevStep: () => void;
  reps: number;
  suggestedMethods?: WarmupMethod[];
  setConfirmMethod: (m: WarmupMethod | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const allMethods: WarmupMethod[] = [
    "classic",
    "rpe",
    "pyramid",
    "fastRamp",
    "volumeRamp",
    "specificRamp",
    "dynamicRamp",
  ];

  const formatMethodName = (m: string) =>
    m.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

  const methodScores: Record<
    WarmupMethod,
    { score: number; suggested: boolean }
  > = allMethods.reduce((acc, m) => {
    let score = 50;
    if (m === "classic") score = reps >= 5 && reps <= 8 ? 80 : 50;
    if (m === "rpe") score = reps >= 5 && reps <= 10 ? 75 : 40;
    if (m === "pyramid") score = reps >= 8 ? 85 : 50;
    if (m === "fastRamp") score = reps <= 3 ? 90 : 40;
    if (m === "volumeRamp") score = reps >= 12 ? 90 : 50;
    if (m === "specificRamp") score = reps <= 2 ? 90 : 50;
    if (m === "dynamicRamp") score = reps >= 5 && reps <= 8 ? 80 : 50;

    const suggested = suggestedMethods.includes(m);
    acc[m] = { score, suggested };
    return acc;
  }, {} as Record<WarmupMethod, { score: number; suggested: boolean }>);

  const handleClick = (m: WarmupMethod, suggested: boolean) => {
    if (!suggested) setConfirmMethod(m);
    setMethod(m);
    nextStep();
  };

  // Animate buttons after DOM is ready
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.children, {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-4 relative">
      <p className="text-neutral-400">
        Select warm-up method (based on your top work set reps: {reps})
      </p>

      <div className="flex flex-col gap-2" ref={containerRef}>
        {allMethods.map((m) => {
          const { score, suggested } = methodScores[m];
          return (
            <div key={m}>
              <Button
                onClick={() => handleClick(m, suggested)}
                className={`w-full py-3 cursor-pointer rounded-lg border flex justify-between items-center transition-all duration-300
                  ${
                    method === m
                      ? "bg-neutral-800 text-amber-400 border-amber-400/50"
                      : ""
                  }
                  ${
                    suggested && method !== m
                      ? "bg-neutral-900/60 text-green-400 hover:bg-neutral-800/60"
                      : ""
                  }
                  ${
                    !suggested && method !== m
                      ? "bg-neutral-900/50 text-red-400 hover:bg-neutral-800/60 opacity-50"
                      : ""
                  }
                  hover:scale-105 hover:shadow-md
                `}
              >
                <span>{formatMethodName(m)}</span>
                <span className="text-sm flex items-center gap-1">
                  {suggested ? "↑" : "↓"} {score}%
                </span>
              </Button>
            </div>
          );
        })}
      </div>

      <Button
        onClick={prevStep}
        className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-amber-400/50 mt-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
      >
        Previous
      </Button>
    </div>
  );
}
