"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Toaster } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import PaymentPage from "./PaymentPage";

import { Lift, Intensity, WarmupMethod, WarmupSet } from "@/lib/warmup/types";
import { computeWarmups } from "@/lib/warmup/computeWarmups";

import StepLift from "./warmup/steps/StepLift";
import StepOneRM from "./warmup/steps/StepOneRM";
import StepPlates from "./warmup/steps/StepPlates";
import StepIntensity from "./warmup/steps/StepIntensity";
import StepMethod from "./warmup/steps/StepMethod";
import StepWorkSet from "./warmup/steps/StepWorkSet";
import StepResult from "./warmup/steps/StepResult";

export default function WarmupCalculatorGuided() {
  const cardRef = useRef<HTMLDivElement>(null);

  const MAX_FREE_TOKENS = 3;

  const [tokensUsed, setTokensUsed] = useState(0);
  const [goToPayment, setGoToPayment] = useState(false);

  const [step, setStep] = useState(0);
  const [lift, setLift] = useState<Lift>();
  const [oneRMs, setOneRMs] = useState<Record<Lift, number>>({ squat: 0, bench: 0, deadlift: 0 });
  const [plates, setPlates] = useState<Record<string, boolean>>({
    p25: false,
    p20: false,
    p15: false,
    p10: false,
    p5: false,
    p2_5: false,
    p1_25: false,
    p1: false,
    p_5: false,
    p_25: false,
    p_125: false,
  });
  const [intensity, setIntensity] = useState<Intensity>();
  const [method, setMethod] = useState<WarmupMethod>();
  const [workSets, setWorkSets] = useState<{ weight: number; reps: number }[]>([{ weight: 0, reps: 0 }]);
  const [warmups, setWarmups] = useState<WarmupSet[]>([]);

  const platesAvailable = Object.entries(plates)
    .filter(([_, v]) => v)
    .map(([k]) => Number(k.replace("p", "").replace("_", ".")))
    .sort((a, b) => a - b);

  const totalSteps = 6;
  const progressPercent = (step / totalSteps) * 100;

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
  }, [step]);

  function nextStep() {
    if (tokensUsed >= MAX_FREE_TOKENS) {
      setGoToPayment(true);
      return;
    }
    if (step === 5) generateWarmup();
    else setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  function generateWarmup() {
    const targetWeightKg = workSets[0]?.weight || 0;
    const targetReps = workSets[0]?.reps || 0;

    const sets = computeWarmups({
      targetWeightKg,
      targetReps,
      lift,
      intensity,
      platesAvailable,
      method,
    });
    setWarmups(sets);
    setStep(6);

    setTokensUsed(tokensUsed + 1);
    if (tokensUsed + 1 >= MAX_FREE_TOKENS) setGoToPayment(true);
  }

  if (goToPayment) return <PaymentPage />;

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative">
      <Toaster position="top-right" richColors />

      {/* Tokens tracker */}
      <div className="absolute top-4 right-4 bg-neutral-800/60 border border-neutral-700 px-4 py-2 rounded-xl text-amber-400 font-semibold z-20">
        Tokens left: {MAX_FREE_TOKENS - tokensUsed}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
        <div className="h-1 bg-amber-400 transition-all" style={{ width: `${progressPercent}%` }} />
      </div>

      <Card
        ref={cardRef}
        className="max-w-2xl bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 shadow-2xl rounded-3xl overflow-hidden"
      >
        <CardContent className="p-6 space-y-6">
          <h1 className="text-3xl font-extrabold text-amber-400">Powerlifting Warm-up Generator</h1>

          {step === 0 && <StepLift lift={lift} setLift={setLift} nextStep={nextStep} />}
          {step === 1 && lift && (
            <StepOneRM
              lift={lift}
              oneRMs={oneRMs}
              setOneRMs={setOneRMs}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 2 && <StepPlates plates={plates} setPlates={setPlates} nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <StepIntensity intensity={intensity} setIntensity={setIntensity} nextStep={nextStep} prevStep={prevStep} />}
          {step === 4 && <StepMethod method={method} setMethod={setMethod} nextStep={nextStep} prevStep={prevStep} />}
          {step === 5 && <StepWorkSet workSets={workSets} setWorkSets={setWorkSets} nextStep={nextStep} prevStep={prevStep} />}
          {step === 6 && lift && <StepResult lift={lift} method={method} warmups={warmups} restart={() => setStep(0)} />}
        </CardContent>
      </Card>
    </div>
  );
}
