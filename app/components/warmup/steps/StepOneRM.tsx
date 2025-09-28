"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lift } from "@/lib/warmup/types";

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
      <p className="text-neutral-300">Enter your current 1RM for {lift.toUpperCase()}:</p>
      <Input
        type="text"
        value={oneRMs[lift]}
        onChange={(e) =>
          setOneRMs((s) => ({ ...s, [lift]: parseFloat(e.target.value) || 0 }))
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
