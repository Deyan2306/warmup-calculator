import type { Lift, WarmupMethod } from "@/types";

export const LIFTS: Lift[] = ["bench", "squat", "deadlift"];

export const LIFT_DISPLAY_NAMES: Record<Lift, string> = {
  bench: "Bench Press",
  squat: "Squat", 
  deadlift: "Deadlift",
};

export const LIFT_COLORS: Record<Lift, string> = {
  bench: "powerlifting-bench",
  squat: "powerlifting-squat",
  deadlift: "powerlifting-deadlift",
};

export const WARMUP_METHODS: WarmupMethod[] = [
  "classic",
  "rpe", 
  "pyramid",
  "fastRamp",
  "volumeRamp",
  "specificRamp",
  "dynamicRamp",
];

export const WARMUP_METHOD_DISPLAY_NAMES: Record<WarmupMethod, string> = {
  classic: "Classic",
  rpe: "RPE Based",
  pyramid: "Pyramid",
  fastRamp: "Fast Ramp",
  volumeRamp: "Volume Ramp", 
  specificRamp: "Specific Ramp",
  dynamicRamp: "Dynamic Ramp",
};

export const WARMUP_METHOD_DESCRIPTIONS: Record<WarmupMethod, string> = {
  classic: "Traditional warm-up with increasing weight and decreasing reps",
  rpe: "Based on Rate of Perceived Exertion for personalized intensity",
  pyramid: "Builds up to working weight then back down",
  fastRamp: "Quick progression to working weight",
  volumeRamp: "Higher volume with moderate intensity",
  specificRamp: "Specific to your lift and goals",
  dynamicRamp: "Dynamic warm-up with movement preparation",
};

export const INTENSITY_LEVELS = ["light", "medium", "heavy"] as const;

export const INTENSITY_DISPLAY_NAMES = {
  light: "Light",
  medium: "Medium", 
  heavy: "Heavy",
} as const;

export const INTENSITY_DESCRIPTIONS = {
  light: "Easy warm-up, focus on movement",
  medium: "Moderate intensity, good preparation",
  heavy: "High intensity, maximum preparation",
} as const;

export const PLATE_WEIGHTS = {
  p25: 25,
  p20: 20,
  p15: 15,
  p10: 10,
  p5: 5,
  p2_5: 2.5,
  p1_25: 1.25,
  p1: 1,
  p_5: 0.5,
  p_25: 0.25,
  p_125: 0.125,
} as const;

export const DEFAULT_PLATES = {
  p25: false,
  p20: false,
  p15: false,
  p10: false,
  p5: false,
  p2_5: false,
  p1_25: false,
  p1: false,
  p_5: false,
  p_25: false,
  p_125: false,
} as const;

export const DEFAULT_ONE_RMS = {
  squat: 0,
  bench: 0,
  deadlift: 0,
} as const;
