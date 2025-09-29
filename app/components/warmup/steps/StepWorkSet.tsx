"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StepWorkSet({
  workSets,
  setWorkSets,
  nextStep,
  prevStep,
}: {
  workSets: { weight: number; reps: number }[];
  setWorkSets: React.Dispatch<
    React.SetStateAction<{ weight: number; reps: number }[]>
  >;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-neutral-300">Enter your top work set:</p>
      <div className="flex gap-2">
        <Input
          type="text"
          value={workSets[0]?.weight || ""}
          onChange={(e) =>
            setWorkSets([
              { ...workSets[0], weight: parseFloat(e.target.value) || 0 },
            ])
          }
          placeholder="Weight"
          className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2"
        />
        <Input
          type="text"
          value={workSets[0]?.reps || ""}
          onChange={(e) =>
            setWorkSets([
              { ...workSets[0], reps: parseFloat(e.target.value) || 0 },
            ])
          }
          placeholder="Reps"
          className="bg-neutral-900/50 text-amber-400 border border-neutral-700 rounded-lg px-3 py-2 w-24"
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={prevStep}
          className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
