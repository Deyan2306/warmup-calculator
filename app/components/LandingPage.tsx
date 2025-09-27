"use client";

import React, { useState } from "react";
import WarmupCalculatorGuided from "./WarmupCalculator";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <WarmupCalculatorGuided />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 opacity-20">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-700 rounded-sm"
            style={{
              transform: `rotate(${Math.random() * 5 - 2.5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-6xl font-extrabold text-amber-400 mb-4 animate-fadeIn">
          PreppedUp
        </h1>
        <p className="text-neutral-300 text-lg sm:text-xl mb-8 animate-fadeIn delay-200">
          Powerlifting warm-ups made simple. Plan your sets, track your intensity, and lift smarter.
        </p>
        <Button
          onClick={() => setStarted(true)}
          className="px-10 py-4 bg-amber-400 text-neutral-900 font-bold rounded-3xl hover:bg-amber-500 transition transform hover:scale-105 animate-fadeIn delay-400"
        >
          Get Started
        </Button>
      </div>

      {/* Features Section */}
      <div className="mt-16 relative z-10 max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
        {[
          { title: "Custom Warm-ups", desc: "Generate warm-up plans tailored to your lift and available plates." },
          { title: "Track Intensity", desc: "Choose light, medium, or heavy days and optimize your performance." },
          { title: "Safe & Efficient", desc: "Warm up properly and reduce the risk of injury while saving time." },
        ].map((feature, idx) => (
          <div key={idx} className="bg-neutral-800/60 p-6 rounded-2xl border border-neutral-700 hover:shadow-2xl transition">
            <h3 className="text-amber-400 font-semibold mb-2">{feature.title}</h3>
            <p className="text-neutral-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
