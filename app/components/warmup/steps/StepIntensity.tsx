"use client";
import { Button } from "@/components/ui/button";
import { Intensity } from "@/lib/warmup/types";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Info, Sun, Cloud, Zap } from "lucide-react";
import { gsap } from "gsap";
import { JSX } from "react";

export default function StepIntensity({
  intensity,
  setIntensity,
  nextStep,
  prevStep,
}: {
  intensity?: Intensity;
  setIntensity: (i: Intensity) => void;
  nextStep: () => void;
  prevStep: () => void;
}) {
  const [showInfo, setShowInfo] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const intensityInfo: Record<Intensity, string> = {
    light:
      "Light intensity: You are almost ready for your workout and don’t need a heavy warm-up.",
    medium:
      "Medium intensity: You feel okay, so a regular warm-up is recommended.",
    heavy:
      "Heavy intensity: You need to warm up thoroughly to safely start your workout.",
  };

  const icons: Record<Intensity, JSX.Element> = {
    light: <Sun className="w-4 h-4 mr-2" />,
    medium: <Cloud className="w-4 h-4 mr-2" />,
    heavy: <Zap className="w-4 h-4 mr-2" />,
  };

  // Animate component mount
  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
          );
        }

        if (buttonsRef.current) {
          gsap.fromTo(
            buttonsRef.current.children,
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
  }, []);

  // Animate info box every time it opens
  useEffect(() => {
    if (showInfo && infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { y: -10, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [showInfo]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div ref={titleRef} className="flex items-center gap-2">
        <p className="text-neutral-400 font-semibold text-lg">
          How do you feel?
        </p>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-neutral-400 hover:text-amber-400 transition-colors"
          aria-label="Show info"
        >
          <Info className="w-4 h-4 cursor-pointer" />
        </button>
      </div>

      {/* Info box */}
      {showInfo && (
        <div
          ref={infoRef}
          className="p-3 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-300 text-sm"
        >
          <ul className="space-y-1">
            <li>
              <strong>Light:</strong> {intensityInfo.light}
            </li>
            <li>
              <strong>Medium:</strong> {intensityInfo.medium}
            </li>
            <li>
              <strong>Heavy:</strong> {intensityInfo.heavy}
            </li>
          </ul>
        </div>
      )}

      {/* Intensity buttons */}
      <div
        ref={buttonsRef}
        className="flex flex-col md:flex-row gap-3 justify-center md:justify-start"
      >
        {(["light", "medium", "heavy"] as Intensity[]).map((i) => (
          <Button
            key={i}
            onClick={() => {
              setIntensity(i);
              nextStep();
            }}
            className={`flex-1 flex items-center justify-center py-3 cursor-pointer bg-neutral-800/70 border border-amber-400/30 text-amber-400 rounded-lg font-semibold transition-all duration-300 transform
              ${
                intensity === i
                  ? "bg-amber-500 text-neutral-900 scale-105 shadow-lg"
                  : "hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105 hover:shadow-md"
              }`}
          >
            {icons[i]}
            {i.charAt(0).toUpperCase() + i.slice(1)}
          </Button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div
        ref={navRef}
        className="flex flex-col md:flex-row gap-3 justify-center md:justify-start"
      >
        <Button
          onClick={prevStep}
          className="flex-1 py-3 bg-neutral-800/70 cursor-pointer text-amber-400 rounded-lg border border-amber-400/30 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105 hover:shadow-md transition-all duration-300"
        >
          Previous
        </Button>
      </div>
    </div>
  );
}
