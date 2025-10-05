"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import { Eye, EyeOff } from "lucide-react";

interface StepAccountProps {
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setData: (d: any) => void;
  next: () => void;
  back: () => void;
}

export default function StepAccount({
  data,
  setData,
  next,
  back,
}: StepAccountProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subStep, setSubStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
  }, [subStep]);

  const passwordMatch = data.password && data.password === data.confirmPassword;

  const getPasswordStrength = () => {
    if (data.password.length < 8)
      return { color: "bg-red-500", width: "w-1/4" };
    if (data.password.length < 12)
      return { color: "bg-yellow-400", width: "w-2/4" };
    return { color: "bg-green-500", width: "w-full" };
  };
  const strength = getPasswordStrength();

  const inputClass =
    "bg-neutral-800/60 text-amber-100 placeholder-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Username Card */}
      {subStep === 0 && (
        <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            We need your username
          </p>
          <Input
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className={inputClass}
          />
          <Button
            disabled={data.username.trim().length < 3}
            onClick={() => setSubStep(1)}
            className={`w-full py-3 rounded-xl font-semibold ${
              data.username.trim().length >= 3
                ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
            }`}
          >
            Next
          </Button>
        </div>
      )}

      {/* Email Card */}
      {subStep === 1 && (
        <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            Your email helps us reach you
          </p>
          <Input
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            className={inputClass}
          />
          <div className="flex gap-3">
            <Button
              onClick={() => setSubStep(0)}
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
            <Button
              disabled={!data.email.includes("@")}
              onClick={() => setSubStep(2)}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                data.email.includes("@")
                  ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                  : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
              }`}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Password Card */}
      {subStep === 2 && (
        <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            Choose a strong password
          </p>
          <div className="relative">
            <Input
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {data.password && (
            <div className="w-full h-1 bg-neutral-800 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-1 transition-all ${strength.color} ${strength.width}`}
              />
            </div>
          )}
          <div className="flex gap-3 mt-3">
            <Button
              onClick={() => setSubStep(1)}
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
            <Button
              disabled={data.password.length < 8}
              onClick={() => setSubStep(3)}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                data.password.length >= 8
                  ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                  : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
              }`}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Confirm Password Card */}
      {subStep === 3 && (
        <div className="space-y-3 p-6 bg-neutral-900/80 rounded-2xl">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            Confirm your password
          </p>
          <div className="relative">
            <Input
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              type={showConfirm ? "text" : "password"}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {!passwordMatch && data.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
          <div className="flex gap-3 mt-3">
            <Button
              onClick={() => setSubStep(2)}
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
            <Button
              disabled={!passwordMatch}
              onClick={next}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                passwordMatch
                  ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                  : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
