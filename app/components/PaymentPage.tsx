"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import WarmupCalculatorGuided from "./WarmupCalculator";

export default function PaymentPage() {
  const MAX_FREE_WORKOUTS = 3;
  const [tokensUsed, setTokensUsed] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [startedWorkout, setStartedWorkout] = useState(false);

  const tokensLeft = MAX_FREE_WORKOUTS - tokensUsed;

  const handleStartWorkout = () => {
    if (tokensLeft > 0 || subscribed) {
      setTokensUsed(tokensUsed + 1);
      setStartedWorkout(true);
    }
  };

  if (startedWorkout) return <WarmupCalculatorGuided />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex flex-col items-center justify-center px-6 relative text-center">
      
      {/* Tokens Tracker */}
      <div className="absolute top-4 right-4 bg-neutral-800/60 border border-neutral-700 px-4 py-2 rounded-xl text-amber-400 font-semibold">
        Tokens left: {subscribed ? "∞" : tokensLeft}
      </div>

      <div className="relative z-10 max-w-2xl space-y-6">
        <h1 className="text-5xl font-extrabold text-amber-400">
          Stay PreppedUp
        </h1>
        <p className="text-neutral-300 text-lg sm:text-xl">
          You have {MAX_FREE_WORKOUTS} free workouts. After that, a subscription is required to continue generating warm-ups.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button
            onClick={handleStartWorkout}
            disabled={tokensLeft === 0 && !subscribed}
            className="px-8 py-4 bg-amber-400 text-neutral-900 font-bold rounded-3xl hover:bg-amber-500 transition"
          >
            {tokensLeft > 0 || subscribed ? "Start Workout" : "Subscribe to Continue"}
          </Button>

          {!subscribed && (
            <Button
              onClick={() => setSubscribed(true)}
              className="px-8 py-4 bg-neutral-800 text-amber-400 font-bold rounded-3xl border border-amber-400 hover:bg-neutral-700 transition"
            >
              Subscribe
            </Button>
          )}
        </div>

        {tokensLeft === 0 && !subscribed && (
          <p className="text-neutral-400 mt-4">
            You’ve used all your free workouts. Please subscribe to continue.
          </p>
        )}
      </div>
    </div>
  );
}
