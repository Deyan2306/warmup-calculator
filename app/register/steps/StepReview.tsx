"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { toast } from "sonner";

interface StepReviewProps {
  data: {
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    nationality: string;
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
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  async function handleRegister() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3002/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      toast.success("Registration successful! 🎉");
      setSuccess(true);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <p className="text-amber-400 text-xl font-semibold">
          Welcome aboard, {data.name}! 🚀
        </p>
        <p className="text-neutral-400">
          Your account has been created successfully.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-amber-500 text-neutral-900 hover:bg-amber-400 transition-all duration-300"
        >
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={containerRef}>
      <p className="text-neutral-300 font-semibold text-lg text-center">
        Review your details 📝
      </p>

      <div className="bg-neutral-800/50 border border-amber-400/30 rounded-2xl p-4 space-y-2 text-sm text-neutral-200">
        <div className="flex justify-between">
          <span>Name:</span>
          <span>
            {data.name} {data.surname}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Username:</span>
          <span>{data.username}</span>
        </div>
        <div className="flex justify-between">
          <span>Email:</span>
          <span>{data.email}</span>
        </div>
        <div className="flex justify-between">
          <span>Nationality:</span>
          <span>{data.nationality}</span>
        </div>
        <hr className="border-neutral-700 my-2" />
        <div className="flex justify-between">
          <span>Squat:</span>
          <span>{data.squat} kg</span>
        </div>
        <div className="flex justify-between">
          <span>Bench:</span>
          <span>{data.bench} kg</span>
        </div>
        <div className="flex justify-between">
          <span>Deadlift:</span>
          <span>{data.deadlift} kg</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={back}
          disabled={loading}
          className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 border border-amber-400/40 hover:bg-neutral-700 hover:text-amber-200"
        >
          Back
        </Button>
        <Button
          disabled={loading}
          onClick={handleRegister}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
            loading
              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
              : "bg-amber-500 text-neutral-900 hover:bg-amber-400 hover:scale-105"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>
    </div>
  );
}
