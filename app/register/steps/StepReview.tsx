"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { toast } from "sonner";
import { Dumbbell, User, PartyPopper } from "lucide-react";

interface StepReviewProps {
  data: {
    username: string;
    email: string;
    password: string;
    nationality: string;
    gender: string;
    bodyWeight: number;
    squat: number;
    bench: number;
    deadlift: number;
  };
  back: () => void;
}

export default function StepReview({ data, back }: StepReviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.children, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  async function handleRegister() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3002/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Registration failed");
      toast.success("Registration successful!");
      setSuccess(true);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ SUCCESS STATE
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center relative overflow-hidden py-10">
        {/* Centered Confetti Animation */}
        <div className="relative flex justify-center items-center w-32 h-32">
          <PartyPopper
            size={64}
            className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-bounce"
          />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-70 animate-ping"
              style={{
                top: `${50 + Math.random() * 40 - 20}%`,
                left: `${50 + Math.random() * 40 - 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <p className="text-amber-400 text-3xl font-extrabold tracking-wide">
            Welcome aboard, {data.username}!
          </p>
          <p className="text-neutral-400 text-sm max-w-sm mx-auto">
            Your account has been successfully created. Let’s start your
            strength journey.
          </p>
        </div>

        <Button
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer bg-amber-500 text-neutral-900 hover:bg-amber-400 px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  // ✅ REVIEW SCREEN
  return (
    <div ref={containerRef} className="relative space-y-8 p-4">
      <h2 className="text-2xl font-extrabold text-center text-amber-400">
        Review your details
      </h2>

      {/* Info Card */}
      <div className="bg-neutral-900/70 border border-amber-400/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3 text-amber-400 font-semibold text-lg">
          <User /> Profile Info
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-neutral-200">
          <span className="text-neutral-400">Username:</span>
          <span>{data.username}</span>
          <span className="text-neutral-400">Email:</span>
          <span className="truncate">{data.email}</span>
          <span className="text-neutral-400">Nationality:</span>
          <span>{data.nationality}</span>
          <span className="text-neutral-400">Gender:</span>
          <span className="capitalize">{data.gender}</span>
          <span className="text-neutral-400">Body Weight:</span>
          <span>{data.bodyWeight} kg</span>
        </div>
      </div>

      {/* Lifts */}
      <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-md shadow-inner space-y-5">
        <div className="flex items-center gap-3 text-amber-400 font-semibold text-lg">
          <Dumbbell /> Strength Stats
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Squat", value: data.squat },
            { label: "Bench", value: data.bench },
            { label: "Deadlift", value: data.deadlift },
          ].map((lift, i) => (
            <div
              key={i}
              className="p-3 bg-neutral-800/60 rounded-xl border border-amber-400/20 hover:border-amber-400/60 transition-all duration-300 hover:scale-105"
            >
              <p className="text-neutral-400 text-sm">{lift.label}</p>
              <p className="text-amber-400 font-bold text-lg">
                {lift.value} kg
              </p>
              <p className="text-xs text-neutral-500">
                {data.bodyWeight
                  ? `${(lift.value / data.bodyWeight).toFixed(2)}x BW`
                  : "--"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={back}
          disabled={loading}
          className="flex-1 py-3 rounded-xl bg-neutral-800/70 text-amber-300 border border-amber-400/40 hover:bg-neutral-700 hover:text-amber-200 transition-all duration-300"
        >
          Back
        </Button>
        <Button
          disabled={loading}
          onClick={handleRegister}
          className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
            loading
              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
              : "bg-amber-500 text-neutral-900 hover:bg-amber-400 hover:scale-105 shadow-lg cursor-pointer"
          }`}
        >
          {loading ? "Registering..." : "Finish & Join"}
        </Button>
      </div>
    </div>
  );
}
