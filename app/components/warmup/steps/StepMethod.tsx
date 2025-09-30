"use client";
import { Button } from "@/components/ui/button";
import { WarmupMethod } from "@/lib/warmup/types";
import ConfirmModal from "../../ConfirmModal";

export default function StepMethod({
  method,
  setMethod,
  nextStep,
  prevStep,
  reps,
  suggestedMethods = [] as WarmupMethod[],
  setConfirmMethod,
}: {
  method: WarmupMethod | undefined;
  setMethod: (m: WarmupMethod) => void;
  nextStep: () => void;
  prevStep: () => void;
  reps: number; // now required, passed from workSets[0].reps
  suggestedMethods?: WarmupMethod[];
  setConfirmMethod: (m: WarmupMethod | null) => void;
}) {
  const allMethods: WarmupMethod[] = [
    "classic",
    "rpe",
    "pyramid",
    "fastRamp",
    "volumeRamp",
    "specificRamp",
    "dynamicRamp",
  ];

  const methodScores: Record<
    WarmupMethod,
    { score: number; suggested: boolean }
  > = allMethods.reduce((acc, m) => {
    let score = 50;
    if (m === "classic") score = reps >= 5 && reps <= 8 ? 80 : 50;
    if (m === "rpe") score = reps >= 5 && reps <= 10 ? 75 : 40;
    if (m === "pyramid") score = reps >= 8 ? 85 : 50;
    if (m === "fastRamp") score = reps <= 3 ? 90 : 40;
    if (m === "volumeRamp") score = reps >= 12 ? 90 : 50;
    if (m === "specificRamp") score = reps <= 2 ? 90 : 50;
    if (m === "dynamicRamp") score = reps >= 5 && reps <= 8 ? 80 : 50;

    const suggested = suggestedMethods.includes(m);
    acc[m] = { score, suggested };
    return acc;
  }, {} as Record<WarmupMethod, { score: number; suggested: boolean }>);

  const handleClick = (m: WarmupMethod, suggested: boolean) => {
    if (!suggested) setConfirmMethod(m); // trigger modal for "bad" methods
    else {
      setMethod(m);
      nextStep();
    }
  };

  return (
    <div className="space-y-4 relative">
      <p className="text-neutral-400">
        Select warm-up method (based on your top work set reps: {reps})
      </p>

      <div className="flex flex-col gap-2">
        {allMethods.map((m) => {
          const { score, suggested } = methodScores[m];
          return (
            <Button
              key={m}
              onClick={() => handleClick(m, suggested)}
              className={`w-full py-2 cursor-pointer rounded-lg border border-neutral-700 flex justify-between items-center transition-opacity
                ${method === m ? "bg-neutral-800 text-amber-400" : ""}
                ${
                  suggested && method !== m
                    ? "bg-neutral-900/60 text-green-400 hover:bg-neutral-800/60"
                    : ""
                }
                ${
                  !suggested && method !== m
                    ? "bg-neutral-900/50 text-red-400 hover:bg-neutral-800/60 opacity-50"
                    : ""
                }
              `}
            >
              <span>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
              <span className="text-sm flex items-center gap-1">
                {suggested ? "↑" : "↓"} {score}%
              </span>
            </Button>
          );
        })}
      </div>

      <Button
        onClick={prevStep}
        className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700 mt-2"
      >
        Previous
      </Button>
    </div>
  );
}
