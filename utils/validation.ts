/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate weight input
 */
export function isValidWeight(weight: number): boolean {
  return weight > 0 && weight <= 1000;
}

/**
 * Validate reps input
 */
export function isValidReps(reps: number): boolean {
  return reps > 0 && reps <= 50;
}

/**
 * Validate one rep max
 */
export function isValidOneRM(oneRM: number): boolean {
  return oneRM > 0 && oneRM <= 1000;
}

/**
 * Validate form data
 */
export function validateFormData(data: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      errors[key] = `${key} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
