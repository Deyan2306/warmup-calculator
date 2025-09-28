export function roundToNearestAvailable(weight: number, plates: number[]) {
  if (!plates.length) return Math.round(weight * 10) / 10; // round to 0.1 kg if no plates
  const smallest = Math.min(...plates);
  return Math.round(weight / smallest) * smallest;
}
