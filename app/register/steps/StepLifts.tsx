"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import Image from "next/image";

interface StepLiftsProps {
  data: {
    gender: "male" | "female" | "";
    bodyWeight: number;
    squat: number;
    bench: number;
    deadlift: number;
  };
  setData: (d: any) => void;
  next: () => void;
  back: () => void;
}

export default function StepLifts({
  data,
  setData,
  next,
  back,
}: StepLiftsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subStep, setSubStep] = useState(0);

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
    return () => ctx.revert();
  }, [subStep]);

  const lifts: {
    type: "squat" | "bench" | "deadlift";
    icon: string;
    label: string;
  }[] = [
    { type: "squat", icon: "/sbd/squat.webp", label: "Squat" },
    { type: "bench", icon: "/sbd/bench.webp", label: "Bench" },
    { type: "deadlift", icon: "/sbd/deadlift.webp", label: "Deadlift" },
  ];

  const getRatio = (lift: number) => {
    if (!data.bodyWeight || lift <= 0) return 0;
    return +(lift / data.bodyWeight).toFixed(2);
  };

  const getLevel = (
    ratio: number,
    liftType: "squat" | "bench" | "deadlift"
  ) => {
    const standards: Record<string, number[]> = {
      squat: [0.5, 1.0, 1.5, 2.0, 2.5],
      bench: [0.3, 0.7, 1.0, 1.5, 2.0],
      deadlift: [0.8, 1.5, 2.0, 2.5, 3.0],
    };
    const labels = ["Novice", "Beginner", "Intermediate", "Advanced", "Elite"];
    const values = standards[liftType];
    for (let i = values.length - 1; i >= 0; i--) {
      if (ratio >= values[i]) return labels[i];
    }
    return "Novice";
  };

  const inputClass =
    "bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

  return (
    <div className="space-y-6 px-4 py-6 md:px-8 md:py-8" ref={containerRef}>
      {/* Step 0: Bodyweight */}
      {subStep === 0 && (
        <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            How much do you weigh?
          </p>
          <Input
            type="number"
            placeholder="Body Weight (kg)"
            value={data.bodyWeight || ""}
            onChange={(e) =>
              setData({ ...data, bodyWeight: Number(e.target.value) })
            }
            className={inputClass}
          />
          <div className="flex gap-3 mt-3">
            <Button
              onClick={back}
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
            <Button
              disabled={!data.bodyWeight}
              onClick={() => setSubStep(1)}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                data.bodyWeight
                  ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                  : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
              }`}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 1: Gender */}
      {subStep === 1 && (
        <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            What's your gender?
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <Button
              onClick={() => {
                setData({ ...data, gender: "male" });
                setSubStep(2);
              }}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                data.gender === "male"
                  ? "bg-amber-500 text-neutral-900"
                  : "bg-neutral-800/60 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200"
              }`}
            >
              Male
            </Button>
            <Button
              onClick={() => {
                setData({ ...data, gender: "female" });
                setSubStep(2);
              }}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                data.gender === "female"
                  ? "bg-amber-500 text-neutral-900"
                  : "bg-neutral-800/60 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200"
              }`}
            >
              Female
            </Button>
          </div>
          <div className="flex gap-3 mt-3">
            <Button
              onClick={() => setSubStep(0)}
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Lift Inputs */}
      {subStep === 2 && (
        <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            Enter your lift maxes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {lifts.map((lift) => {
              const liftValue = data[lift.type];
              const ratio = getRatio(liftValue);
              const level = getLevel(ratio, lift.type);

              return (
                <div
                  key={lift.type}
                  className="flex flex-col items-center p-6 bg-neutral-800/60 rounded-2xl space-y-2"
                >
                  <Image
                    src={lift.icon}
                    width={48}
                    height={48}
                    alt={lift.label}
                  />
                  <p className="text-amber-400 font-semibold">{lift.label}</p>
                  <Input
                    type="number"
                    placeholder="Enter max"
                    value={liftValue || ""}
                    onChange={(e) =>
                      setData({ ...data, [lift.type]: Number(e.target.value) })
                    }
                    className={`${inputClass} text-center`}
                  />
                  {liftValue > 0 && data.bodyWeight > 0 && (
                    <div className="flex flex-col items-center text-amber-400 font-semibold">
                      <span>{ratio}x BW</span>
                      <span>{level}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => setSubStep(1)}
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
            <Button
              disabled={lifts.some((l) => !data[l.type] || data[l.type] <= 0)}
              onClick={next}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                lifts.every((l) => data[l.type] && data[l.type] > 0)
                  ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                  : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
