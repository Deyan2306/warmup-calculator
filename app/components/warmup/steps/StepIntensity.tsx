"use client";
import { Button } from "@/components/ui/button";
import { Intensity } from "@/lib/warmup/types";

export default function StepIntensity({
  intensity,
  setIntensity,
  nextStep,
  prevStep,
}: {
  intensity?: Intensity;
  setIntensity: (i: Intensity) => void;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-neutral-300">Select intensity:</p>
      <div className="flex gap-3">
        {(["light", "medium", "heavy"] as Intensity[]).map((i) => (
          <Button
            key={i}
            onClick={() => {
              setIntensity(i);
              nextStep();
            }}
            className={`flex-1 py-2 cursor-pointer rounded-lg border border-neutral-700 ${
              intensity === i
                ? "bg-neutral-800 text-amber-400"
                : "bg-neutral-900/50 text-amber-400 hover:bg-neutral-800/60"
            }`}
          >
            {i.charAt(0).toUpperCase() + i.slice(1)}
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
