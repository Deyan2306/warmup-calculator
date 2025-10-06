"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import Image from "next/image";
import { User, User2, Dumbbell, Star } from "lucide-react";

type LiftType = "squat" | "bench" | "deadlift";

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

  const lifts: { type: LiftType; icon: string; label: string }[] = [
    { type: "squat", icon: "/sbd/squat.webp", label: "Squat" },
    { type: "bench", icon: "/sbd/bench.webp", label: "Bench" },
    { type: "deadlift", icon: "/sbd/deadlift.webp", label: "Deadlift" },
  ];

  const getRatio = (lift: number) =>
    !data.bodyWeight || lift <= 0 ? 0 : +(lift / data.bodyWeight).toFixed(2);

  const getLevel = (ratio: number, liftType: LiftType) => {
    const standards: Record<LiftType, number[]> = {
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

  const inputClass = `
    bg-neutral-800 text-amber-400 border border-amber-400
    rounded-lg px-3 py-3 focus:ring-2 focus:ring-amber-400
    transition-all duration-300 hover:scale-105 hover:shadow-md
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none
    &[type="number"]:appearance-textfield
  `;

  const buttonClass =
    "flex-1 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300";

  const currentLift = subStep >= 2 ? lifts[subStep - 2] : null;

  return (
    <div
      className="space-y-6 px-4 py-6 md:px-8 md:py-8 flex justify-center"
      ref={containerRef}
    >
      <div className="w-full max-w-3xl space-y-6">
        {/* Step 0: Bodyweight */}
        {subStep === 0 && (
          <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
            <p className="text-neutral-300 font-semibold text-lg text-center">
              What's your body weight?
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
                className={`${buttonClass} bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200`}
              >
                Back
              </Button>
              <Button
                disabled={!data.bodyWeight}
                onClick={() => setSubStep(1)}
                className={`${buttonClass} ${
                  data.bodyWeight
                    ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                    : "bg-neutral-800/60 text-neutral-600"
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
              Select your gender
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <Button
                onClick={() => {
                  setData({ ...data, gender: "male" });
                  setSubStep(2);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 ${
                  data.gender === "male"
                    ? "bg-amber-500 text-neutral-900"
                    : "bg-neutral-800/60 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200"
                }`}
              >
                <User size={20} /> Male
              </Button>
              <Button
                onClick={() => {
                  setData({ ...data, gender: "female" });
                  setSubStep(2);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 ${
                  data.gender === "female"
                    ? "bg-amber-500 text-neutral-900"
                    : "bg-neutral-800/60 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200"
                }`}
              >
                <User2 size={20} /> Female
              </Button>
            </div>
            <div className="flex gap-3 mt-3">
              <Button
                onClick={() => setSubStep(0)}
                className={`${buttonClass} bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200`}
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 2+: Lifts */}
        {subStep >= 2 && currentLift && (
          <div className="space-y-6 p-6 bg-neutral-900/80 rounded-2xl">
            <p className="text-neutral-300 font-semibold text-lg text-center">
              Enter your {currentLift.label} max
            </p>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Image
                src={currentLift.icon}
                width={64}
                height={64}
                alt={currentLift.label}
              />
              <Input
                type="number"
                placeholder="Enter max"
                value={data[currentLift.type] || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    [currentLift.type]: Number(e.target.value),
                  })
                }
                className={`${inputClass} text-center w-full max-w-xs`}
              />

              {/* Ratio and level display */}
              {data[currentLift.type] > 0 && data.bodyWeight > 0 && (
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-semibold shadow-sm">
                    <Dumbbell size={16} />
                    <span>{getRatio(data[currentLift.type])}x BW</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-semibold shadow-sm">
                    <Star size={16} />
                    <span>
                      {getLevel(
                        getRatio(data[currentLift.type]),
                        currentLift.type
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setSubStep(subStep - 1)}
                className={`${buttonClass} bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200`}
              >
                Back
              </Button>
              <Button
                disabled={
                  !data[currentLift.type] || data[currentLift.type] <= 0
                }
                onClick={() =>
                  subStep - 2 < lifts.length - 1
                    ? setSubStep(subStep + 1)
                    : next()
                }
                className={`${buttonClass} ${
                  data[currentLift.type] && data[currentLift.type] > 0
                    ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                    : "bg-neutral-800/60 text-neutral-600"
                }`}
              >
                {subStep - 2 < lifts.length - 1 ? "Next" : "Continue"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
