export type Lift = "bench" | "squat" | "deadlift";

export type Intensity = "light" | "medium" | "heavy";

export type WarmupSet = {
  weight: number;
  reps: number | string;
  rpe: number | string;
};

export type WarmupMethod =
  | "classic"
  | "rpe"
  | "pyramid"
  | "fastRamp"
  | "volumeRamp"
  | "specificRamp"
  | "dynamicRamp";

export type OneRMs = Record<Lift, number>;

export type Plates = Record<string, boolean>;

export type WorkSet = {
  weight: number;
  reps: number;
};

export type WarmupCalculatorState = {
  step: number;
  lift?: Lift;
  oneRMs: OneRMs;
  plates: Plates;
  intensity?: Intensity;
  method?: WarmupMethod;
  workSets: WorkSet[];
  warmups: WarmupSet[];
  tokensUsed: number;
  goToPayment: boolean;
  confirmMethod: WarmupMethod | null;
};
