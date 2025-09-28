"use client";
import { Button } from "@/components/ui/button";
import { WarmupMethod } from "@/lib/warmup/types";

export default function StepMethod({
  method,
  setMethod,
  nextStep,
  prevStep,
}: {
  method: WarmupMethod;
  setMethod: (m: WarmupMethod) => void;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-neutral-300">Select warm-up method:</p>
      <div className="flex flex-col gap-2">
        {(["classic", "rpe", "pyramid", "fastRamp"] as WarmupMethod[]).map((m) => (
          <Button
            key={m}
            onClick={() => {
              setMethod(m);
              nextStep();
            }}
            className={`w-full py-2 cursor-pointer rounded-lg border border-neutral-700 ${
              method === m
                ? "bg-neutral-800 text-amber-400"
                : "bg-neutral-900/50 text-amber-400 hover:bg-neutral-800/60"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </Button>
        ))}
      </div>
      <Button
        onClick={prevStep}
        className="w-full py-2 bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700 mt-2"
      >
        Previous
      </Button>
    </div>
  );
}
