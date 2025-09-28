"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lift } from "@/lib/warmup/types";
import { Info } from "lucide-react";
import Link from "next/link";

export default function StepOneRM({
  lift,
  oneRMs,
  setOneRMs,
  nextStep,
  prevStep,
}: {
  lift: Lift;
  oneRMs: Record<Lift, number>;
  setOneRMs: React.Dispatch<React.SetStateAction<Record<Lift, number>>>;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between relative">
        <p className="text-neutral-300">
          Enter your current 1RM for {lift.toUpperCase()}:
        </p>

        {/* Pass the lift as a query param */}
        <Link
          href={`/estimate-one-rep-max?lift=${encodeURIComponent(lift)}`}
          className="group relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-amber-400 hover:text-amber-300 hover:bg-neutral-700 hover:cursor-pointer hover:scale-110 transition-transform duration-200 bg-transparent"
          >
            <Info className="h-5 w-5" />
          </Button>

          <span className="absolute z-50 -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-neutral-300 bg-neutral-900 border border-neutral-700 px-2 py-1 rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            Calculate your one rep max
          </span>
        </Link>
      </div>

      <Input
        type="text"
        value={oneRMs[lift]}
        onChange={(e) =>
          setOneRMs((s) => ({
            ...s,
            [lift]: parseFloat(e.target.value) || 0,
          }))
        }
        placeholder={`${lift.toUpperCase()} 1RM`}
        className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400"
      />

      <div className="flex gap-2">
        <Button
          onClick={prevStep}
          className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          className="flex-1 py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
