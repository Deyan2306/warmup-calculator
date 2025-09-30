"use client";
import { Button } from "@/components/ui/button";
import { Intensity } from "@/lib/warmup/types";
import { useState } from "react";
import { Info } from "lucide-react";

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
  const [showInfo, setShowInfo] = useState(false);

  const intensityInfo: Record<Intensity, string> = {
    light:
      "Light intensity: You are almost ready for your workout and don’t need a heavy warm-up.",
    medium:
      "Medium intensity: You feel okay, so a regular warm-up is recommended.",
    heavy:
      "Heavy intensity: You need to warm up thoroughly to safely start your workout.",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <p className="text-neutral-400 font-medium">How do you feel?</p>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-neutral-400 hover:text-amber-400 transition-colors"
          aria-label="Show info"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {showInfo && (
        <div className="p-3 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-300 text-sm">
          <ul className="space-y-1">
            <li>
              <strong>Light:</strong> {intensityInfo.light}
            </li>
            <li>
              <strong>Medium:</strong> {intensityInfo.medium}
            </li>
            <li>
              <strong>Heavy:</strong> {intensityInfo.heavy}
            </li>
          </ul>
        </div>
      )}

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
        className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700 mt-2"
      >
        Previous
      </Button>
    </div>
  );
}
