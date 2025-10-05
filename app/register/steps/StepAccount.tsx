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
  const [showPassword, setShowPassword] = useState(false);

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

  const isValid =
    data.username.trim().length >= 3 &&
    data.email.includes("@") &&
    data.password.length >= 8;

  return (
    <div className="space-y-6" ref={containerRef}>
      <p className="text-neutral-300 font-semibold text-lg text-center">
        Set up your account 🧩
      </p>

      <div className="space-y-3">
        <Input
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
        />
        <Input
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
          type="email"
        />

        <div className="relative">
          <Input
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={showPassword ? "text" : "password"}
            className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400 pr-10"
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
              className={`h-1 transition-all ${
                data.password.length < 8
                  ? "bg-red-500 w-1/4"
                  : data.password.length < 12
                  ? "bg-yellow-400 w-2/4"
                  : "bg-green-500 w-full"
              }`}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={back}
          className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 border border-amber-400/40 hover:bg-neutral-700 hover:text-amber-200"
        >
          Back
        </Button>
        <Button
          disabled={!isValid}
          onClick={next}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isValid
              ? "bg-amber-500 text-neutral-900 hover:bg-amber-400 hover:scale-105"
              : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
