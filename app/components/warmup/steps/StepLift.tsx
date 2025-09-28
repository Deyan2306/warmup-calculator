"use client";
import { Button } from "@/components/ui/button";
import { Lift } from "@/lib/warmup/types";

export default function StepLift({ lift, setLift, nextStep }: {
  lift?: Lift;
  setLift: (l: Lift) => void;
  nextStep: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-neutral-300">Select the lift:</p>
      <div className="flex gap-3">
        {(["squat", "bench", "deadlift"] as Lift[]).map((l) => (
          <Button
            key={l}
            onClick={() => { setLift(l); nextStep(); }}
            className={`flex-1 py-2 cursor-pointer rounded-lg border border-neutral-700 ${
              lift === l
                ? "bg-neutral-800 text-amber-400"
                : "bg-neutral-900/50 text-amber-400 hover:bg-neutral-800/60"
            }`}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
