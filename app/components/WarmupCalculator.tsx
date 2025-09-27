"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type WarmupSet = { weight: number; reps: number | string };

export default function WarmupCalculator() {
  const [oneRMs, setOneRMs] = useState({ squat: 180, bench: 100, deadlift: 200 });
  const [lift, setLift] = useState<"bench" | "squat" | "deadlift">("squat");
  const [intensity, setIntensity] = useState<"light" | "medium" | "heavy">("medium");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [workSets, setWorkSets] = useState<{ weight: number; reps: number }[]>([{ weight: 140, reps: 3 }]);
  const [plates, setPlates] = useState({ p5: true, p2_5: true, p1: false, p0_5: false });
  const [warmups, setWarmups] = useState<WarmupSet[]>([]);
  const [feedback, setFeedback] = useState("");

  const warmupPercentages: Record<"bench" | "squat" | "deadlift", number[]> = {
    squat: [0.4, 0.55, 0.7, 0.85, 0.9],
    bench: [0.3, 0.5, 0.65, 0.75, 0.85, 0.9],
    deadlift: [0.4, 0.55, 0.7, 0.8, 0.9],
  };

  function roundToPlates(weight: number) {
    const available: number[] = [];
    if (plates.p5) available.push(5);
    if (plates.p2_5) available.push(2.5);
    if (plates.p1) available.push(1);
    if (plates.p0_5) available.push(0.5);
    if (available.length === 0) return weight;

    const smallest = Math.min(...available);
    return Math.round(weight / smallest) * smallest;
  }

  function convertWeight(num: number) {
    return unit === "kg" ? num : Math.round(num * 2.20462);
  }

  function calculate() {
    if (!workSets.length) return;

    const targetWeight = workSets[0].weight;
    const targetReps = workSets[0].reps;

    const percentages = warmupPercentages[lift];
    if (!percentages) return;

    let setsToUse: number[] = [];
    switch (intensity) {
      case "light":
        setsToUse = percentages.slice(0, Math.floor(percentages.length * 0.6));
        break;
      case "medium":
        setsToUse = percentages.slice(0, Math.floor(percentages.length * 0.8));
        break;
      case "heavy":
        setsToUse = percentages;
        break;
    }

    // Build warm-up sets as WarmupSet[]
    const sets: WarmupSet[] = setsToUse.map((pct) => {
      const weight = roundToPlates(targetWeight * pct / (targetWeight / oneRMs[lift]));
      const reps = Math.max(1, Math.round(targetReps * pct / setsToUse[setsToUse.length - 1]));
      return { weight, reps };
    });

    sets.push({ weight: targetWeight, reps: `${targetReps} (work set)` });

    setWarmups(sets);
    setFeedback(`Estimated warm-up: ${sets.length} sets (~${sets.length * 2} minutes).`);
  }

  function clearAll() {
    setWarmups([]);
    setFeedback("");
    setWorkSets([{ weight: 140, reps: 3 }]);
  }

  function copyToClipboard() {
    const text = warmups
      .map((s, i) => `Set ${i + 1}: ${convertWeight(s.weight)} ${unit} × ${s.reps}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Warm-up plan copied to clipboard!");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-neutral-900 border border-red-600 shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-red-500">
            Powerlifting Warm-up Calculator
          </h1>

          {/* 1RM Inputs */}
          <div className="grid grid-cols-3 gap-2">
            {["squat", "bench", "deadlift"].map((l) => (
              <div key={l}>
                <label className="text-sm text-red-400">{l.toUpperCase()} 1RM</label>
                <Input
                  type="number"
                  value={oneRMs[l as keyof typeof oneRMs]}
                  onChange={(e) => setOneRMs({ ...oneRMs, [l]: Number(e.target.value) })}
                  className="bg-neutral-800 border border-red-600 text-white"
                />
              </div>
            ))}
          </div>

          {/* Lift Type */}
          <div className="space-y-2">
            <label className="text-sm text-red-400">Lift</label>
            <Select value={lift} onValueChange={(val) => setLift(val as "bench" | "squat" | "deadlift")}>
              <SelectTrigger className="bg-neutral-800 border border-red-600 text-white">
                <SelectValue placeholder="Select lift" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border border-red-600">
                <SelectItem value="squat" className="text-white">Squat</SelectItem>
                <SelectItem value="bench" className="text-white">Bench</SelectItem>
                <SelectItem value="deadlift" className="text-white">Deadlift</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Warm-up Intensity with Tooltip */}
          <div className="space-y-2">
            <label className="text-sm text-red-400 flex items-center">
              Warm-up Intensity
              <Tooltip>
                <TooltipTrigger className="ml-1 cursor-pointer text-red-400 font-bold">?</TooltipTrigger>
                <TooltipContent className="bg-neutral-800 text-white text-sm p-2 rounded">
                  Light: minimal warm-up sets, Medium: standard ramp-up, Heavy: full warm-up
                </TooltipContent>
              </Tooltip>
            </label>
            <Select value={intensity} onValueChange={(val) => setIntensity(val as "light" | "medium" | "heavy")}>
              <SelectTrigger className="bg-neutral-800 border border-red-600 text-white">
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border border-red-600">
                <SelectItem value="light" className="text-white">Light</SelectItem>
                <SelectItem value="medium" className="text-white">Medium</SelectItem>
                <SelectItem value="heavy" className="text-white">Heavy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Plate Availability */}
          <div className="flex space-x-4">
            {Object.entries(plates).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-1">
                <Checkbox
                  checked={value}
                  onCheckedChange={(checked: boolean | "indeterminate") =>
                    setPlates({ ...plates, [key]: checked === true })
                  }
                />
                <span className="text-sm text-white">{key.replace("p", "").replace("_", ".")}kg</span>
              </div>
            ))}
          </div>

          {/* Work Sets Input */}
          <div className="space-y-2">
            {workSets.map((ws, idx) => (
              <div key={idx} className="flex space-x-2">
                <Input
                  type="number"
                  value={ws.weight}
                  onChange={(e) => {
                    const newSets = [...workSets];
                    newSets[idx].weight = Number(e.target.value);
                    setWorkSets(newSets);
                  }}
                  className="bg-neutral-800 border border-red-600 text-white"
                  placeholder="Weight"
                />
                <Input
                  type="number"
                  value={ws.reps}
                  onChange={(e) => {
                    const newSets = [...workSets];
                    newSets[idx].reps = Number(e.target.value);
                    setWorkSets(newSets);
                  }}
                  className="bg-neutral-800 border border-red-600 text-white"
                  placeholder="Reps"
                />
              </div>
            ))}
            <Button
              onClick={() => setWorkSets([...workSets, { weight: 0, reps: 0 }])}
              className="bg-red-600 hover:bg-red-700 text-white font-bold w-full"
            >
              Add Work Set
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button onClick={calculate} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold">Calculate</Button>
            <Button onClick={clearAll} className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-bold">Clear</Button>
            {warmups.length > 0 && (
              <Button onClick={copyToClipboard} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold">Copy</Button>
            )}
          </div>

          {/* Dynamic Feedback */}
          {feedback && <p className="text-sm text-red-400">{feedback}</p>}

          {/* Warm-up Plan */}
          {warmups.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-red-400">Warm-up Plan</h2>
              <ul className="space-y-1">
                {warmups.map((set, i) => (
                  <li key={i} className="flex justify-between border-b border-neutral-700 pb-1">
                    <span className="text-white">Set {i+1}</span>
                    <span className="text-red-400 font-semibold">{convertWeight(set.weight)} {unit} × {set.reps}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
