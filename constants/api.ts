export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
  },
  USER: {
    PROFILE: "/api/user/profile",
    SETTINGS: "/api/user/settings",
    SUBSCRIPTION: "/api/user/subscription",
  },
  WARMUP: {
    GENERATE: "/api/warmup/generate",
    SAVE: "/api/warmup/save",
    HISTORY: "/api/warmup/history",
  },
  ONE_RM: {
    ESTIMATE: "/api/one-rm/estimate",
    SAVE: "/api/one-rm/save",
    HISTORY: "/api/one-rm/history",
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const API_RATE_LIMITS = {
  FREE: {
    REQUESTS_PER_HOUR: 10,
    REQUESTS_PER_DAY: 50,
  },
  PREMIUM: {
    REQUESTS_PER_HOUR: 100,
    REQUESTS_PER_DAY: 1000,
  },
  PRO: {
    REQUESTS_PER_HOUR: 500,
    REQUESTS_PER_DAY: 5000,
  },
} as const;
