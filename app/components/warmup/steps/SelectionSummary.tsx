"use client";

import { Intensity, Lift, WarmupMethod } from "@/lib/warmup/types";

interface SelectionSummaryProps {
  lift?: Lift;
  oneRMs: Record<Lift, number>;
  plates: Record<string, boolean>;
  intensity?: Intensity;
  method?: WarmupMethod;
  workSets: { weight: number; reps: number }[];
}

export default function SelectionsSummary({
  lift,
  oneRMs,
  plates,
  intensity,
  method,
  workSets,
}: SelectionSummaryProps) {
  const selectedPlates = Object.entries(plates)
    .filter(([_, v]) => v)
    .map(([k]) => k.replace("p", "").replace("_", "."))
    .join(", ");

  return (
    <div className="bg-neutral-800/70 border border-neutral-700 text-white p-4 rounded-xl max-w-xs w-full shadow-lg">
      <h2 className="font-bold text-lg mb-2 text-amber-400">Your Selections</h2>
      <div className="text-sm space-y-1">
        {lift && (
          <div>
            Lift: <strong>{lift}</strong>
          </div>
        )}
        {lift && oneRMs[lift] > 0 && (
          <div>
            1RM: <strong>{oneRMs[lift]} kg</strong>
          </div>
        )}
        {selectedPlates && (
          <div>
            Plates: <strong>{selectedPlates}</strong>
          </div>
        )}
        {intensity && (
          <div>
            Intensity: <strong>{intensity}</strong>
          </div>
        )}
        {method && (
          <div>
            Method: <strong>{method}</strong>
          </div>
        )}
        {workSets[0]?.weight > 0 && workSets[0]?.reps > 0 && (
          <div>
            Work Set:{" "}
            <strong>
              {workSets[0].weight} kg x {workSets[0].reps}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}
