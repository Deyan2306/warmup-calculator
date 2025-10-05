"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import Image from "next/image";

interface StepLiftsProps {
  data: {
    squat: number;
    bench: number;
    deadlift: number;
  };
  setData: (d: any) => void;
  next: () => void;
  back: () => void;
}

export default function StepLifts({
  data,
  setData,
  next,
  back,
}: StepLiftsProps) {
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
    data.squat > 0 &&
    data.bench > 0 &&
    data.deadlift > 0 &&
    data.squat < 600 &&
    data.bench < 400 &&
    data.deadlift < 700;

  return (
    <div className="space-y-6" ref={containerRef}>
      <p className="text-neutral-300 font-semibold text-lg text-center">
        Enter your best lifts 🏋️
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Image src="/sbd/squat.webp" alt="Squat" width={24} height={24} />
          <Input
            type="number"
            placeholder="Squat (kg)"
            value={data.squat || ""}
            onChange={(e) =>
              setData({ ...data, squat: Number(e.target.value) })
            }
            className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <Image src="/sbd/bench.webp" alt="Bench" width={24} height={24} />
          <Input
            type="number"
            placeholder="Bench (kg)"
            value={data.bench || ""}
            onChange={(e) =>
              setData({ ...data, bench: Number(e.target.value) })
            }
            className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <Image
            src="/sbd/deadlift.webp"
            alt="Deadlift"
            width={24}
            height={24}
          />
          <Input
            type="number"
            placeholder="Deadlift (kg)"
            value={data.deadlift || ""}
            onChange={(e) =>
              setData({ ...data, deadlift: Number(e.target.value) })
            }
            className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
          />
        </div>
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
