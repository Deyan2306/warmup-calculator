"use client";

import React from "react";
import { gsap } from "gsap";
import { Toaster } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import PaymentPage from "@/components/common/PaymentPage";
import Image from "next/image";
import Link from "next/link";

import { useWarmupCalculator, useAnimation } from "@/hooks";
import ConfirmModal from "@/components/common/ConfirmModal";

import StepLift from "./steps/StepLift";
import StepOneRM from "./steps/StepOneRM";
import StepPlates from "./steps/StepPlates";
import StepIntensity from "./steps/StepIntensity";
import StepMethod from "./steps/StepMethod";
import StepWorkSet from "./steps/StepWorkSet";
import StepResult from "./steps/StepResult";
import SelectionSummary from "./steps/SelectionSummary";

export default function WarmupCalculator() {
  const {
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
    platesAvailable,
    totalSteps,
    progressPercent,
    setLift,
    setOneRMs,
    setPlates,
    setIntensity,
    setMethod,
    setWorkSets,
    setConfirmMethod,
    nextStep,
    prevStep,
    restart,
    getSuggestedMethods,
  } = useWarmupCalculator();

  const {
    cardRef,
    summaryMobileRef,
    summaryDesktopRef,
    animateCard,
    animateSummary,
  } = useAnimation();

  // Animate card on step change
  React.useEffect(() => {
    animateCard(step);
  }, [step, animateCard]);

  // Animate summary panels
  React.useEffect(() => {
    animateSummary();
  }, [step, animateSummary]);

  if (goToPayment) return <PaymentPage />;

  return (
    <div className="min-h-screen bg-neutral-900 p-4 md:p-0 relative flex flex-col items-center justify-start overflow-x-hidden">
      <Toaster position="top-right" richColors />

      {/* Navbar */}
      <header className="w-full flex items-center justify-center xl:justify-start h-16 px-4 mb-6">
        <Link href="/">
          <div className="h-full relative w-auto cursor-pointer">
            <Image
              width={86}
              height={86}
              src="/pumped-up-logo.webp"
              alt="Pumped Up Logo"
              className="h-full w-auto"
              priority
            />
          </div>
        </Link>
      </header>

      {/* Confirmation Modal */}
      {confirmMethod && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <ConfirmModal
            message={`The method "${confirmMethod}" is not optimal for your reps (${workSets[0]?.reps}). Are you sure you want to proceed?`}
            onConfirm={() => {
              if (confirmMethod) {
                setMethod(confirmMethod);
                setConfirmMethod(null);
              }
            }}
            onCancel={() => setConfirmMethod(null)}
          />
        </div>
      )}

      {/* Card + Summary */}
      <div className="flex-1 w-full max-w-full sm:max-w-md px-2 flex flex-col items-center justify-center">
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
                setLift={setLift}
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
                restart={restart}
              />
            )}
          </CardContent>
        </Card>

        {/* Mobile Summary */}
        {step !== 6 && (
          <div className="xl:hidden mt-6 w-full" ref={summaryMobileRef}>
            <SelectionSummary
              lift={lift}
              oneRMs={oneRMs}
              plates={plates}
              intensity={intensity}
              method={method}
              workSets={workSets}
            />
          </div>
        )}
      </div>

      {/* Desktop Summary */}
      {step !== 6 && (
        <div
          className="hidden xl:block absolute top-20 left-4 w-[300px] max-w-[90vw]"
          ref={summaryDesktopRef}
        >
          <SelectionSummary
            lift={lift}
            oneRMs={oneRMs}
            plates={plates}
            intensity={intensity}
            method={method}
            workSets={workSets}
          />
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <div
          className="h-1 bg-amber-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
