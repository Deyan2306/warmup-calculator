export type Lift = "bench" | "squat" | "deadlift";
export type Intensity = "light" | "medium" | "heavy";
export type WarmupMethod = "classic" | "rpe" | "pyramid" | "fastRamp";
export type WarmupSet = { weight: number; reps: number | string; rpe: number | string };
