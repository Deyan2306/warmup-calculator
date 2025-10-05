"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface StepPersonalProps {
  data: {
    name: string;
    surname: string;
    nationality: string;
  };
  setData: (d: any) => void;
  next: () => void;
}

const StepPersonal = ({ data, setData, next }: StepPersonalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    data.name.trim().length > 1 &&
    data.surname.trim().length > 1 &&
    data.nationality.trim().length > 1;

  return (
    <div className="space-y-6" ref={containerRef}>
      <p className="text-neutral-300 font-semibold text-lg text-center">
        Let’s get to know you 💪
      </p>

      <div className="space-y-3">
        <Input
          placeholder="First name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
        />
        <Input
          placeholder="Surname"
          value={data.surname}
          onChange={(e) => setData({ ...data, surname: e.target.value })}
          className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
        />
        <Input
          placeholder="Nationality"
          value={data.nationality}
          onChange={(e) => setData({ ...data, nationality: e.target.value })}
          className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
        />
      </div>

      <Button
        disabled={!isValid}
        onClick={next}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
          ${
            isValid
              ? "bg-amber-500 text-neutral-900 hover:bg-amber-400 hover:scale-105"
              : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
          }`}
      >
        Continue
      </Button>
    </div>
  );
};

export default StepPersonal;
