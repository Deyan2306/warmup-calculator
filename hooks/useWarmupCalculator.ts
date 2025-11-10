"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { 
  Lift, 
  Intensity, 
  WarmupMethod, 
  WarmupSet, 
  OneRMs, 
  Plates, 
  WorkSet 
} from "@/types";
import { computeWarmups } from "@/lib/warmup/computeWarmups";
import { 
  DEFAULT_ONE_RMS, 
  DEFAULT_PLATES, 
  MAX_FREE_TOKENS 
} from "@/constants";

export function useWarmupCalculator() {
  const searchParams = useSearchParams();
  const liftParam = searchParams.get("lift") as Lift | null;

  // State
  const [step, setStep] = useState(0);
  const [lift, setLift] = useState<Lift | undefined>(undefined);
  const [oneRMs, setOneRMs] = useState<OneRMs>(DEFAULT_ONE_RMS);
  const [plates, setPlates] = useState<Plates>(DEFAULT_PLATES);
  const [intensity, setIntensity] = useState<Intensity>();
  const [method, setMethod] = useState<WarmupMethod | undefined>(undefined);
  const [workSets, setWorkSets] = useState<WorkSet[]>([
    { weight: 0, reps: 0 },
  ]);
  const [warmups, setWarmups] = useState<WarmupSet[]>([]);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [goToPayment, setGoToPayment] = useState(false);
  const [confirmMethod, setConfirmMethod] = useState<WarmupMethod | null>(null);

  // Computed values
  const platesAvailable = Object.entries(plates)
    .filter(([_, v]) => v)
    .map(([k]) => Number(k.replace("p", "").replace("_", ".")))
    .sort((a, b) => a - b);

  const totalSteps = 6;
  const progressPercent = (step / totalSteps) * 100;

  // Set lift from URL param
  useEffect(() => {
    if (liftParam) {
      setLift(liftParam);
      setStep(1);
    }
  }, [liftParam]);

  // Navigation functions
  const nextStep = () => {
    if (tokensUsed >= MAX_FREE_TOKENS) {
      setGoToPayment(true);
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 1) {
      setLift(undefined);
    }
    if (step === 3) {
      setIntensity(undefined);
    }
    if (step > 0) setStep(step - 1);
  };

  const generateWarmup = () => {
    if (!method) return;

    const targetWeightKg = workSets[0]?.weight || 0;
    const targetReps = workSets[0]?.reps || 0;

    const sets = computeWarmups({
      targetWeightKg,
      targetReps,
      lift: lift ?? undefined,
      intensity,
      platesAvailable,
      method,
    });

    setWarmups(sets);
    setStep(6);
    setTokensUsed(tokensUsed + 1);
    if (tokensUsed + 1 >= MAX_FREE_TOKENS) setGoToPayment(true);
  };

  // Automatically generate warmup when method is selected
  useEffect(() => {
    if (step === 5 && method) {
      generateWarmup();
    }
  }, [method, step]);

  const getSuggestedMethods = (reps: number): WarmupMethod[] => {
    const suggested: WarmupMethod[] = [];
    if (reps >= 10) suggested.push("pyramid", "volumeRamp");
    else if (reps <= 3) suggested.push("fastRamp", "dynamicRamp");
    else suggested.push("rpe", "classic");
    return suggested;
  };

  const restart = () => {
    setStep(0);
    setLift(undefined);
    setOneRMs(DEFAULT_ONE_RMS);
    setPlates(DEFAULT_PLATES);
    setIntensity(undefined);
    setMethod(undefined);
    setWorkSets([{ weight: 0, reps: 0 }]);
    setWarmups([]);
    setConfirmMethod(null);
  };

  return {
    // State
    step,
    lift,
    oneRMs,
    plates,
    intensity,
    method,
    workSets,
    warmups,
    tokensUsed,
    goToPayment,
    confirmMethod,
    
    // Computed
    platesAvailable,
    totalSteps,
    progressPercent,
    
    // Actions
    setLift,
    setOneRMs,
    setPlates,
    setIntensity,
    setMethod,
    setWorkSets,
    setConfirmMethod,
    nextStep,
    prevStep,
    generateWarmup,
    restart,
    getSuggestedMethods,
  };
}
