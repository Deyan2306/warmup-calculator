export const APP_CONFIG = {
  name: "PreppedUp",
  description: "Powerlifting warm-ups made simple.",
  version: "0.1.0",
  author: "Your Name",
  url: "https://preppedup.com",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CREATE_WARMUP: "/create-warmup",
  ESTIMATE_ONE_REP_MAX: "/estimate-one-rep-max",
  DASHBOARD: "/home",
} as const;

export const MAX_FREE_TOKENS = 3;

export const TOKEN_LIMITS = {
  FREE: 3,
  PREMIUM: 50,
  PRO: 200,
} as const;

export const SUBSCRIPTION_TIERS = {
  FREE: "free",
  PREMIUM: "premium", 
  PRO: "pro",
} as const;
