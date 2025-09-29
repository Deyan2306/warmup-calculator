import { WarmupSet, Lift, Intensity, WarmupMethod } from "./types";
import { roundToNearestAvailable } from "./roundToNearestAvailable";

export function computeWarmups({
  targetWeightKg,
  targetReps,
  lift,
  intensity,
  platesAvailable,
  method,
}: {
  targetWeightKg: number;
  targetReps: number;
  lift?: Lift;
  intensity?: Intensity;
  platesAvailable: number[];
  method: WarmupMethod | undefined;
}): WarmupSet[] {
  if (!lift || !intensity) return [];

  const sets: WarmupSet[] = [];

  switch (method) {
    case "classic": {
      const basePercentages = [0.4, 0.55, 0.7, 0.85, 0.9];
      basePercentages.forEach((p, idx) => {
        const raw = targetWeightKg * p;
        const rounded = roundToNearestAvailable(raw, platesAvailable);
        const reps = Math.max(1, Math.round(targetReps * (1 - idx * 0.2)));
        const rpe = 5 + idx;
        sets.push({ weight: rounded, reps, rpe });
      });
      break;
    }

    case "rpe": {
      const rpeTargets = [5, 6, 7, 8];
      rpeTargets.forEach((r, idx) => {
        const pct = 0.4 + idx * 0.15;
        const raw = targetWeightKg * pct;
        const rounded = roundToNearestAvailable(raw, platesAvailable);
        const reps = Math.max(1, Math.round(targetReps * (1 - idx * 0.25)));
        sets.push({ weight: rounded, reps, rpe: r });
      });
      break;
    }

    case "pyramid": {
      const pyramid = [
        { pct: 0.4, reps: 12, rpe: 5 },
        { pct: 0.6, reps: 10, rpe: 6 },
        { pct: 0.7, reps: 8, rpe: 7 },
        { pct: 0.8, reps: 6, rpe: 8 },
      ];
      pyramid.forEach((p) => {
        const raw = targetWeightKg * p.pct;
        const rounded = roundToNearestAvailable(raw, platesAvailable);
        sets.push({ weight: rounded, reps: p.reps, rpe: p.rpe });
      });
      break;
    }

    case "fastRamp": {
      const jumps = [0.5, 0.7, 0.85];
      jumps.forEach((p, idx) => {
        const raw = targetWeightKg * p;
        const rounded = roundToNearestAvailable(raw, platesAvailable);
        const reps = 3 - idx;
        sets.push({ weight: rounded, reps, rpe: 6 + idx });
      });
      break;
    }

    case "volumeRamp": {
      const percentages = [0.3, 0.5, 0.65, 0.75, 0.85];
      percentages.forEach((p, idx) => {
        const raw = targetWeightKg * p;
        const rounded = roundToNearestAvailable(raw, platesAvailable);
        const reps = Math.max(1, Math.round(targetReps * (1 - idx * 0.1)));
        const rpe = 5 + idx * 0.5;
        sets.push({ weight: rounded, reps, rpe });
      });

      break;
    }

    case "specificRamp": {
      const percentages = [0.5, 0.65, 0.8, 0.9];
      percentages.forEach((p, idx) => {
        const raw = targetWeightKg * p;
        const rounded = roundToNearestAvailable(raw, platesAvailable);
        const reps =
          idx === percentages.length - 1
            ? targetReps
            : Math.max(1, targetReps - (percentages.length - idx));
        const rpe = 6 + idx;
        sets.push({ weight: rounded, reps, rpe });
      });

      break;
    }

    case "dynamicRamp": {
      const percentages = [0.4, 0.55, 0.7, 0.8];
      percentages.forEach((p, idx) => {
        const raw = targetWeightKg * p;
        const rounded = roundToNearestAvailable(raw, platesAvailable);
        const reps = Math.max(1, Math.round(targetReps * (1 - idx * 0.15)));
        const rpe = 5 + idx * 1.2;
        sets.push({ weight: rounded, reps, rpe });
      });

      break;
    }
  }

  sets.push({
    weight: targetWeightKg,
    reps: `${targetReps} — work set`,
    rpe: 8.5,
  });
  return sets;
}
