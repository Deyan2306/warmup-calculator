"use client";
import { Button } from "@/components/ui/button";

export default function StepPlates({
  plates,
  setPlates,
  nextStep,
  prevStep,
}: {
  plates: Record<string, boolean>;
  setPlates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-neutral-300">Select available plates:</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(plates)
          .sort(
            (a, b) =>
              Number(b[0].replace("p", "").replace("_", ".")) -
              Number(a[0].replace("p", "").replace("_", "."))
          )
          .map(([k, v]) => {
            const label = k.replace("p", "").replace("_", ".") + " kg";
            return (
              <Button
                key={k}
                onClick={() => setPlates((p) => ({ ...p, [k]: !p[k] }))}
                className={`px-3 py-1 cursor-pointer rounded-full border border-neutral-700 ${
                  v
                    ? "bg-neutral-800 text-amber-400"
                    : "bg-neutral-900/50 text-amber-400 hover:bg-neutral-800/60"
                }`}
              >
                {label}
              </Button>
            );
          })}
      </div>
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
