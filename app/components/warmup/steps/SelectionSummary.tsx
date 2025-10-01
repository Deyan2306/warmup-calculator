"use client";

import { Intensity, Lift, WarmupMethod } from "@/lib/warmup/types";
import {
  CheckCircle2,
  Circle,
  Dumbbell,
  Weight,
  Gauge,
  Layers,
  Target,
} from "lucide-react";

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatMethod(method: string): string {
  return method
    .replace(/([A-Z])/g, " $1") // split camelCase
    .replace(/^./, (s) => s.toUpperCase()) // capitalize first
    .trim();
}

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

  function Row({
    label,
    value,
    icon,
  }: {
    label: string;
    value?: string | number;
    icon: React.ReactNode;
  }) {
    const isSelected = value !== undefined && value !== "" && value !== 0;
    return (
      <div className="flex items-center space-x-2">
        {isSelected ? (
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-neutral-500 shrink-0" />
        )}
        <div
          className={`flex items-center justify-between w-full ${
            isSelected ? "text-green-400 font-semibold" : "text-neutral-400"
          }`}
        >
          <div className="flex items-center space-x-1">
            {icon}
            <span>{label}:</span>
          </div>
          <span className="truncate max-w-[120px] text-right">
            {isSelected ? value : ""}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800/70 border border-neutral-700 text-white p-4 rounded-xl w-full sm:w-72 max-w-full shadow-lg">
      <h2 className="font-bold text-lg mb-3 text-amber-400">Your Selections</h2>
      <div className="text-sm space-y-2">
        <Row
          label="Lift"
          value={lift ? capitalize(lift) : ""}
          icon={<Dumbbell className="w-4 h-4" />}
        />
        <Row
          label="1RM"
          value={lift && oneRMs[lift] > 0 ? `${oneRMs[lift]} kg` : ""}
          icon={<Weight className="w-4 h-4" />}
        />
        <Row
          label="Plates"
          value={selectedPlates}
          icon={<Layers className="w-4 h-4" />}
        />
        <Row
          label="Intensity"
          value={intensity ? capitalize(intensity) : ""}
          icon={<Gauge className="w-4 h-4" />}
        />
        <Row
          label="Work Set"
          value={
            workSets[0]?.weight > 0 && workSets[0]?.reps > 0
              ? `${workSets[0].weight} kg x ${workSets[0].reps}`
              : ""
          }
          icon={<Dumbbell className="w-4 h-4" />}
        />
        <Row
          label="Method"
          value={method ? formatMethod(method) : ""}
          icon={<Target className="w-4 h-4" />}
        />
      </div>
    </div>
  );
}
