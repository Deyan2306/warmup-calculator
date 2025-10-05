"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import StepPersonal from "./steps/StepPersonal";
import StepAccount from "./steps/StepAccount";
import StepLifts from "./steps/StepLifts";
import StepReview from "./steps/StepReview";

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    nationality: "",
    squat: 0,
    bench: 0,
    deadlift: 0,
  });

  const totalSteps = 4;
  const progressPercent = (step / totalSteps) * 100;

  // Animate card when step changes
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [step]);

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-start p-4 relative">
      {/* Navbar */}
      <header className="w-full flex justify-center h-16 mb-8">
        <Image
          src="/pumped-up-logo.webp"
          alt="Pumped Up Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </header>

      {/* Registration Card */}
      <Card
        ref={cardRef}
        className="w-full max-w-md bg-neutral-900/80 border border-neutral-700 shadow-2xl rounded-3xl"
      >
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-extrabold text-amber-400 text-center">
            Create Your Account
          </h1>

          {/* Step components */}
          {step === 0 && (
            <StepPersonal
              data={formData}
              setData={setFormData}
              next={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <StepAccount
              data={formData}
              setData={setFormData}
              next={() => setStep(2)}
              back={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <StepLifts
              data={formData}
              setData={setFormData}
              next={() => setStep(3)}
              back={() => setStep(1)}
            />
          )}

          {step === 3 && <StepReview data={formData} back={() => setStep(2)} />}
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-neutral-800">
        <div
          className="h-1 bg-amber-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
