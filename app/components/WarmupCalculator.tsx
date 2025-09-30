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
import ConfirmModal from "./ConfirmModal";
import { useSearchParams } from "next/navigation";
import SelectionsSummary from "./warmup/steps/SelectionSummary";

export default function WarmupCalculatorGuided() {
  const cardRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const MAX_FREE_TOKENS = 3;

  const [confirmMethod, setConfirmMethod] = useState<WarmupMethod | null>(null);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [goToPayment, setGoToPayment] = useState(false);
  const [step, setStep] = useState(0);
  const [lift, setLift] = useState<Lift | undefined>(undefined);
  const [oneRMs, setOneRMs] = useState<Record<Lift, number>>({
    squat: 0,
    bench: 0,
    deadlift: 0,
  });
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
  const [method, setMethod] = useState<WarmupMethod | undefined>(undefined);
  const [workSets, setWorkSets] = useState<{ weight: number; reps: number }[]>([
    { weight: 0, reps: 0 },
  ]);
  const [warmups, setWarmups] = useState<WarmupSet[]>([]);

  const liftParam = searchParams.get("lift") as Lift | null;

  const platesAvailable = Object.entries(plates)
    .filter(([_, v]) => v)
    .map(([k]) => Number(k.replace("p", "").replace("_", ".")))
    .sort((a, b) => a - b);

  const totalSteps = 6;
  const progressPercent = (step / totalSteps) * 100;

  useEffect(() => {
    if (liftParam) {
      setLift(liftParam);
      setStep(1);
    }
  }, [liftParam]);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [step]);

  function getSuggestedMethods(reps: number): WarmupMethod[] {
    const suggested: WarmupMethod[] = [];
    if (reps >= 10) suggested.push("pyramid", "volumeRamp");
    else if (reps <= 3) suggested.push("fastRamp", "dynamicRamp");
    else suggested.push("rpe", "classic");
    return suggested;
  }

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
    if (!method) return setStep(4);

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
    <div className="min-h-screen bg-neutral-900 relative flex flex-col items-center justify-center p-4 overflow-x-hidden">
      <Toaster position="top-right" richColors />

      {confirmMethod && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <ConfirmModal
            message={`The method "${confirmMethod}" is not optimal for your reps (${workSets[0]?.reps}). Are you sure you want to proceed?`}
            onConfirm={() => {
              if (confirmMethod) {
                setMethod(confirmMethod);
                setConfirmMethod(null);
                nextStep();
              }
            }}
            onCancel={() => setConfirmMethod(null)}
          />
        </div>
      )}

      {/* Tokens tracker */}
      <div className="absolute top-4 right-4 bg-neutral-800/60 border border-neutral-700 px-3 py-2 rounded-xl text-amber-400 font-semibold z-20 max-w-[90vw] truncate">
        Tokens left: {MAX_FREE_TOKENS - tokensUsed}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-full sm:max-w-md px-2">
        <Card
          ref={cardRef}
          className="w-full bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 shadow-2xl rounded-3xl overflow-visible relative z-10"
        >
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-4 text-center sm:text-left">
              Powerlifting Warm-up Generator
            </h1>

            {step === 0 && (
              <StepLift lift={lift} setLift={setLift} nextStep={nextStep} />
            )}
            {step === 1 && lift && (
              <StepOneRM
                lift={lift}
                oneRMs={oneRMs}
                setOneRMs={setOneRMs}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 2 && (
              <StepPlates
                plates={plates}
                setPlates={setPlates}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 3 && (
              <StepIntensity
                intensity={intensity}
                setIntensity={setIntensity}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 4 && (
              <StepWorkSet
                workSets={workSets}
                setWorkSets={setWorkSets}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 5 && (
              <StepMethod
                method={method}
                setMethod={setMethod}
                nextStep={nextStep}
                prevStep={prevStep}
                reps={workSets[0]?.reps || 0}
                suggestedMethods={getSuggestedMethods(workSets[0]?.reps || 0)}
                setConfirmMethod={setConfirmMethod}
              />
            )}
            {step === 6 && lift && (
              <StepResult
                lift={lift}
                method={method}
                warmups={warmups}
                restart={() => setStep(0)}
              />
            )}
          </CardContent>
        </Card>

        {/* Summary below card on screens <1200px */}
        <div className="xl:hidden mt-4 w-full">
          <SelectionsSummary
            lift={lift}
            oneRMs={oneRMs}
            plates={plates}
            intensity={intensity}
            method={method}
            workSets={workSets}
          />
        </div>
      </div>

      {/* Summary top-left on screens ≥1200px */}
      <div className="hidden xl:block absolute top-4 left-4 w-[300px] max-w-[90vw]">
        <SelectionsSummary
          lift={lift}
          oneRMs={oneRMs}
          plates={plates}
          intensity={intensity}
          method={method}
          workSets={workSets}
        />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
        <div
          className="h-1 bg-amber-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
