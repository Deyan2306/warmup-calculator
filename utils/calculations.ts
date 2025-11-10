/**
 * Calculate one rep max using Epley formula
 */
export function calculateOneRM(weight: number, reps: number): number {
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
}

/**
 * Calculate working weight from one rep max and percentage
 */
export function calculateWorkingWeight(oneRM: number, percentage: number): number {
  return oneRM * (percentage / 100);
}

/**
 * Calculate percentage from working weight and one rep max
 */
export function calculatePercentage(workingWeight: number, oneRM: number): number {
  if (oneRM === 0) return 0;
  return (workingWeight / oneRM) * 100;
}

/**
 * Round weight to nearest available plate
 */
export function roundToNearestPlate(
  weight: number,
  availablePlates: number[],
  barWeight: number = 20
): number {
  const targetWeight = weight - barWeight;
  const halfTarget = targetWeight / 2;
  
  let closestWeight = 0;
  let minDifference = Infinity;
  
  for (const plate of availablePlates) {
    const totalWeight = barWeight + (plate * 2);
    const difference = Math.abs(totalWeight - weight);
    
    if (difference < minDifference) {
      minDifference = difference;
      closestWeight = totalWeight;
    }
  }
  
  return closestWeight;
}

/**
 * Calculate total weight with plates
 */
export function calculateTotalWeight(plates: number[], barWeight: number = 20): number {
  return barWeight + plates.reduce((sum, plate) => sum + plate * 2, 0);
}

/**
 * Calculate BMI
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Calculate body fat percentage (rough estimate)
 */
export function calculateBodyFat(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  const bmi = calculateBMI(weight, height);
  
  if (gender === "male") {
    return (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    return (1.20 * bmi) + (0.23 * age) - 5.4;
  }
}
