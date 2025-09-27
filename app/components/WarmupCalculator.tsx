"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Toaster } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// -----------------------------
// Types
// -----------------------------

type Lift = "bench" | "squat" | "deadlift";
type Intensity = "light" | "medium" | "heavy";
type WarmupSet = { weight: number; reps: number | string };

// -----------------------------
// Utilities
// -----------------------------

const formatKg = (n: number) => `${Math.round(n * 10) / 10}`;
const toLbs = (kg: number) => Math.round(kg * 2.2046226218);

const warmupPercentages: Record<Lift, number[]> = {
  squat: [0.4, 0.55, 0.7, 0.85, 0.9],
  bench: [0.3, 0.5, 0.65, 0.75, 0.85, 0.9],
  deadlift: [0.4, 0.55, 0.7, 0.8, 0.9],
};

function roundToNearestAvailable(weight: number, plates: number[]) {
  if (!plates.length) return Math.round(weight * 10) / 10;
  const smallest = Math.min(...plates);
  return Math.round(weight / smallest) * smallest;
}

function computeWarmups({
  targetWeightKg,
  targetReps,
  lift,
  intensity,
  platesAvailable,
}: {
  targetWeightKg: number;
  targetReps: number;
  lift?: Lift;
  intensity?: Intensity;
  platesAvailable: number[];
}) {
  if (!lift || !intensity) return [];

  const percentages = warmupPercentages[lift];
  let setsToUse: number[] = [];

  switch (intensity) {
    case "light":
      setsToUse = percentages.slice(0, Math.max(1, Math.floor(percentages.length * 0.5)));
      break;
    case "medium":
      setsToUse = percentages.slice(0, Math.max(2, Math.floor(percentages.length * 0.8)));
      break;
    case "heavy":
      setsToUse = percentages;
      break;
  }

  const topPct = setsToUse[setsToUse.length - 1] || percentages[percentages.length - 1];

  const sets = setsToUse.map((pct) => {
    const rawKg = (targetWeightKg * pct) / topPct;
    const rounded = roundToNearestAvailable(rawKg, platesAvailable);
    const reps = Math.max(1, Math.round((targetReps * pct) / topPct));
    return { weight: rounded, reps } as WarmupSet;
  });

  sets.push({ weight: targetWeightKg, reps: `${targetReps} — work set` });

  return sets;
}

// -----------------------------
// Main Component
// -----------------------------

export default function WarmupCalculatorGuided() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0); // 0 = lift, 1 = 1RM, 2 = plates, 3 = intensity, 4 = work sets, 5 = generated
  const [lift, setLift] = useState<Lift>();
  const [oneRMs, setOneRMs] = useState<Record<Lift, number>>({ squat: 0, bench: 0, deadlift: 0 });
  const [plates, setPlates] = useState<Record<string, boolean>>({
    p25: false, p20: false, p15: false, p10: false, p5: false, p2_5: false, p1_25: false, p1: false, p_5: false, p_25: false, p_125: false,
  });
  const [intensity, setIntensity] = useState<Intensity>();
  const [workSets, setWorkSets] = useState<{ weight: number; reps: number }[]>([{ weight: 0, reps: 0 }]);
  const [warmups, setWarmups] = useState<WarmupSet[]>([]);

  const platesAvailable = Object.entries(plates)
    .filter(([_, v]) => v)
    .map(([k]) => Number(k.replace("p", "").replace("_", ".")))
    .sort((a, b) => a - b);

  const totalSteps = 5;
  const progressPercent = (step / totalSteps) * 100;

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
  }, [step]);

  function nextStep() {
    if (step === 4) generateWarmup();
    else setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  function generateWarmup() {
    const targetWeightKg = workSets[0]?.weight || 0;
    const targetReps = workSets[0]?.reps || 0;

    const sets = computeWarmups({ targetWeightKg, targetReps, lift, intensity, platesAvailable });
    setWarmups(sets);
    setStep(5);
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative">
      <Toaster position="top-right" richColors />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
        <div className="h-1 bg-amber-400 transition-all" style={{ width: `${progressPercent}%` }} />
      </div>

      <Card ref={cardRef} className="max-w-2xl bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-3xl font-extrabold text-amber-400">Powerlifting Warm-up Generator</h1>

          {/* Step 0: Lift */}
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-neutral-300">Select the lift:</p>
              <div className="flex gap-3">
                {(["squat", "bench", "deadlift"] as Lift[]).map((l) => (
                  <Button
                    key={l}
                    onClick={() => { setLift(l); nextStep(); }}
                    className={`flex-1 py-2 cursor-pointer rounded-lg border border-neutral-700 ${
                      lift === l ? "bg-neutral-800 text-amber-400" : "bg-neutral-900/50 text-amber-400 hover:bg-neutral-800/60"
                    }`}
                  >
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: 1RM */}
          {step === 1 && lift && (
            <div className="space-y-4">
              <p className="text-neutral-300">Enter your current 1RM for {lift.toUpperCase()}:</p>
              <Input
                type="text"
                value={oneRMs[lift]}
                onChange={(e) => setOneRMs((s) => ({ ...s, [lift]: parseFloat(e.target.value) || 0 }))}
                placeholder={`${lift.toUpperCase()} 1RM`}
                className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400"
              />
              <div className="flex gap-2">
                <Button onClick={prevStep} className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">Previous</Button>
                <Button onClick={nextStep} className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">Next</Button>
              </div>
            </div>
          )}

          {/* Step 2: Plates */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-neutral-300">Select available plates:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(plates)
                  .sort((a, b) => Number(b[0].replace("p", "").replace("_", ".")) - Number(a[0].replace("p", "").replace("_", ".")))
                  .map(([k, v]) => {
                    const label = k.replace("p", "").replace("_", ".") + " kg";
                    return (
                      <Button
                        key={k}
                        onClick={() => setPlates((p) => ({ ...p, [k]: !p[k] }))}
                        className={`px-3 py-1 cursor-pointer rounded-full border border-neutral-700 ${
                          v ? "bg-neutral-800 text-amber-400" : "bg-neutral-900/50 text-amber-400 hover:bg-neutral-800/60"
                        }`}
                      >
                        {label}
                      </Button>
                    );
                  })}
              </div>
              <div className="flex gap-2">
                <Button onClick={prevStep} className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">Previous</Button>
                <Button onClick={nextStep} className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">Next</Button>
              </div>
            </div>
          )}

          {/* Step 3: Intensity */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-neutral-300">Select intensity:</p>
              <div className="flex gap-3">
                {(["light", "medium", "heavy"] as Intensity[]).map((i) => (
                  <Button
                    key={i}
                    onClick={() => { setIntensity(i); nextStep(); }}
                    className={`flex-1 py-2 cursor-pointer rounded-lg border border-neutral-700 ${
                      intensity === i ? "bg-neutral-800 text-amber-400" : "bg-neutral-900/50 text-amber-400 hover:bg-neutral-800/60"
                    }`}
                  >
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                  </Button>
                ))}
              </div>
              <Button onClick={prevStep} className="w-full py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700 mt-2">Previous</Button>
            </div>
          )}

          {/* Step 4: Work sets */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-neutral-300">Enter your top work set:</p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={workSets[0]?.weight || ""}
                  onChange={(e) => setWorkSets([{ ...workSets[0], weight: parseFloat(e.target.value) || 0 }])}
                  placeholder="Weight"
                  className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2"
                />
                <Input
                  type="text"
                  value={workSets[0]?.reps || ""}
                  onChange={(e) => setWorkSets([{ ...workSets[0], reps: parseFloat(e.target.value) || 0 }])}
                  placeholder="Reps"
                  className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2 w-24"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={prevStep} className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">Previous</Button>
                <Button onClick={nextStep} className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">Generate Warm-up</Button>
              </div>
            </div>
          )}

          {/* Step 5: Warm-up generated */}
          {step === 5 && lift && (
            <div className="space-y-4">
              <p className="text-neutral-300">Your warm-up plan:</p>
              <ul className="space-y-2">
                {warmups.map((s, i) => (
                  <li key={i} className="flex justify-between bg-neutral-800/60 p-3 rounded-lg border border-neutral-700">
                    <div>
                      <div className="text-sm font-medium text-amber-400">Set {i + 1}</div>
                      <div className="text-xs text-neutral-400">{lift.toUpperCase()}</div>
                    </div>
                    <div className="text-right text-amber-400">
                      <div className="font-semibold">{formatKg(s.weight)} kg</div>
                      <div className="text-xs text-neutral-400">{s.reps}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button onClick={() => setStep(0)} className="w-full py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">Start Over</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
