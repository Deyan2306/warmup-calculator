"use client";
import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StepPlates({
  plates,
  setPlates,
  nextStep,
  prevStep,
}: {
  plates: Record<string, boolean>;
  setPlates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  nextStep: () => void;
  prevStep: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    // Animate only on mount
    const id = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
          );
        }

        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.4,
              ease: "power3.out",
            }
          );
        }

        if (navRef.current) {
          gsap.fromTo(
            navRef.current.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              delay: 0.2,
              duration: 0.4,
              ease: "power3.out",
            }
          );
        }
      });

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(id);
  }, []); // <-- empty dependency array = run only once on mount

  return (
    <div className="space-y-6">
      {/* Title */}
      <p
        ref={titleRef}
        className="text-neutral-400 font-semibold text-lg text-center md:text-left"
      >
        Select available plates:
      </p>

      {/* Plates */}
      <div
        ref={containerRef}
        className="flex flex-wrap gap-3 justify-center md:justify-start"
      >
        {Object.entries(plates)
          .sort(
            (a, b) =>
              Number(b[0].replace("p", "").replace("_", ".")) -
              Number(a[0].replace("p", "").replace("_", "."))
          )
          .map(([k, v]) => {
            const label = k.replace("p", "").replace("_", ".") + " kg";
            return (
              <Button
                key={k}
                onClick={() => setPlates((p) => ({ ...p, [k]: !p[k] }))}
                className={`px-4 py-2 cursor-pointer rounded-full border transition-all duration-300 transform
                  ${
                    v
                      ? "bg-amber-500 text-neutral-900 hover:text-amber-400 border-amber-400/70 scale-105 shadow-lg"
                      : "bg-neutral-800/70 text-amber-400 border-amber-400/30 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105 hover:shadow-md"
                  }`}
              >
                {label}
              </Button>
            );
          })}
      </div>

      {/* Navigation Buttons */}
      <div
        ref={navRef}
        className="flex flex-col md:flex-row gap-3 justify-center md:justify-start"
      >
        <Button
          onClick={prevStep}
          className="flex-1 py-3 cursor-pointer bg-neutral-800/70 text-amber-400 rounded-lg border border-amber-400/30 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105 hover:shadow-md transition-all duration-300"
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          onClick={nextStep}
          className="flex-1 py-3 cursor-pointer bg-amber-500 hover:bg-neutral-900 border border-amber-400/50 hover:text-amber-400 text-neutral-900 font-bold hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
