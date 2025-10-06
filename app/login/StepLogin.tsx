"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

interface StepLoginProps {
  data: { username: string; password: string };
  setData: (d: any) => void;
  next: () => void;
  back: () => void;
}

export default function StepLogin({
  data,
  setData,
  next,
  back,
}: StepLoginProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [step, setStep] = useState(0); // 0 = username, 1 = password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".step-one-child", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [step]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (!data.username.trim() || !data.password.trim()) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!res.ok) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      const token = await res.text();
      if (!token) {
        setError("Login failed: empty token");
        setLoading(false);
        return;
      }

      localStorage.setItem("jwt", token);
      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const buttonClass =
    "flex-1 py-3 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-md";

  return (
    <div className="space-y-4" ref={containerRef}>
      {error && (
        <p className="text-red-400 text-center font-semibold step-one-child">
          {error}
        </p>
      )}

      {/* Step 0: Username */}
      {step === 0 && (
        <div className="space-y-4 step-one-child">
          <Input
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="bg-neutral-800 text-amber-400 border border-amber-400 rounded-lg px-3 py-3 focus:ring-2 focus:ring-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-md step-one-child"
          />
          <div className="flex gap-3">
            <Button
              disabled
              className={`${buttonClass} bg-neutral-800/70 text-amber-400`}
            >
              <ChevronLeft /> Previous
            </Button>
            <Button
              onClick={() => setStep(1)}
              disabled={!data.username.trim()}
              className={`${buttonClass} ${
                data.username.trim()
                  ? "bg-amber-500 text-neutral-900 hover:text-amber-400"
                  : "bg-neutral-800/60 text-neutral-600"
              }`}
            >
              Next <ChevronRight />
            </Button>
          </div>
        </div>
      )}

      {/* Step 1: Password */}
      {step === 1 && (
        <div className="space-y-4 step-one-child">
          <Input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="bg-neutral-800 text-amber-400 border border-amber-400 rounded-lg px-3 py-3 focus:ring-2 focus:ring-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-md step-one-child"
          />
          <div className="flex gap-3">
            <Button
              onClick={() => setStep(0)}
              className={`${buttonClass} bg-neutral-800/70 text-amber-400`}
            >
              <ChevronLeft /> Previous
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!data.password.trim() || loading}
              className={`${buttonClass} ${
                data.password.trim() && !loading
                  ? "bg-amber-500 text-neutral-900 hover:text-amber-400"
                  : "bg-neutral-800/60 text-neutral-600"
              }`}
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Next <ChevronRight />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
