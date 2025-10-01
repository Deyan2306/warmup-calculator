"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lift } from "@/lib/warmup/types";
import { gsap } from "gsap";

export default function CalculateOneRepMax() {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [oneRM, setOneRM] = useState<number | null>(null);
  const [formulaUsed, setFormulaUsed] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const liftParam = searchParams.get("lift") as Lift | null;

  const href = liftParam
    ? `/create-warmup?lift=${encodeURIComponent(liftParam)}`
    : `/create-warmup`;

  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Animate container on load
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.children, {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  function calculateOneRM() {
    if (weight > 0 && reps > 0) {
      let estimated = 0;
      if (reps <= 10) {
        estimated = (weight * 36) / (37 - reps);
        setFormulaUsed("Brzycki");
      } else {
        estimated = weight * Math.pow(reps, 0.1);
        setFormulaUsed("Lombardi");
      }
      setOneRM(Math.round(estimated));
      setShowInfo(false);

      // Animate result section after calculation
      setTimeout(() => {
        if (resultRef.current) {
          gsap.fromTo(
            resultRef.current.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
        }
      }, 50);
    } else {
      setOneRM(null);
      setFormulaUsed("");
      setShowInfo(false);
    }
  }

  function getFormulaInfo() {
    if (formulaUsed === "Brzycki") {
      return (
        <>
          <p className="text-sm text-neutral-300">
            <span className="font-semibold">Brzycki formula:</span> 1RM =
            (Weight × 36) ÷ (37 − Reps)
          </p>
          <p className="text-sm text-neutral-400">
            Works best for rep ranges up to 10. Often used for bench press and
            moderate loads.
          </p>
        </>
      );
    }
    if (formulaUsed === "Lombardi") {
      return (
        <>
          <p className="text-sm text-neutral-300">
            <span className="font-semibold">Lombardi formula:</span> 1RM =
            Weight × Reps^0.10
          </p>
          <p className="text-sm text-neutral-400">
            More reliable for higher reps. Commonly used for squat and deadlift
            sets of 10+ reps.
          </p>
        </>
      );
    }
    return null;
  }

  // Animate info box when it appears
  useEffect(() => {
    if (showInfo && infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { height: 0, opacity: 0, y: -10 },
        { height: "auto", opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [showInfo]);

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="w-full max-w-md bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 rounded-3xl shadow-xl p-6 space-y-6"
      >
        <h1 className="text-2xl font-extrabold text-amber-400 text-center">
          One Rep Max Estimator
        </h1>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="number"
              value={weight || ""}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              placeholder="Weight lifted"
              className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2 flex-1 focus:border-amber-400 focus:ring-amber-400 transition-all"
            />
            <Input
              type="number"
              value={reps || ""}
              onChange={(e) => setReps(parseFloat(e.target.value) || 0)}
              placeholder="Reps"
              className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2 w-24 focus:border-amber-400 focus:ring-amber-400 transition-all"
            />
          </div>

          <Button
            onClick={calculateOneRM}
            className="w-full py-2 bg-neutral-800 cursor-pointer text-amber-400 rounded-lg border border-neutral-700 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105 hover:shadow-md transition-all"
          >
            Calculate
          </Button>
        </div>

        {oneRM !== null && (
          <div ref={resultRef} className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-neutral-300">
                  Estimated 1RM (using {formulaUsed}):
                </p>
                <p className="text-3xl font-bold text-amber-400 animate-pulse">
                  {oneRM} kg
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 text-amber-400 cursor-pointer hover:bg-neutral-700 hover:text-amber-300 transition-transform hover:scale-110"
                onClick={() => setShowInfo((prev) => !prev)}
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>

            {/* Only render info box when showInfo === true */}
            {showInfo && (
              <div
                ref={infoRef}
                className="overflow-hidden bg-neutral-800 border border-neutral-700 rounded-lg p-3 space-y-2"
              >
                {getFormulaInfo()}
              </div>
            )}

            <Link href={href}>
              <Button className="w-full py-4 cursor-pointer bg-amber-400 text-neutral-900 font-semibold rounded-lg border border-neutral-700 hover:bg-amber-500 hover:scale-105 hover:shadow-lg transition-all">
                Continue to Warm-up Generator
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
