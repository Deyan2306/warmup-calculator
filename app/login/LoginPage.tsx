"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import StepLogin from "./StepLogin";

export default function LoginPage() {
  const [step, setStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const totalSteps = 2; // username + password
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

      {/* Login Card */}
      <Card
        ref={cardRef}
        className="w-full max-w-md bg-neutral-900/80 border border-neutral-700 shadow-2xl rounded-3xl"
      >
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-extrabold text-amber-400 text-center">
            Login
          </h1>

          {/* StepLogin Component */}
          <StepLogin
            data={loginData}
            setData={setLoginData}
            next={() => console.log("Login successful!")}
            back={() => {
              if (step > 0) setStep(step - 1);
            }}
          />
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
