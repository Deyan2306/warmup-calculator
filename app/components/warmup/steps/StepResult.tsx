"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WarmupSet, Lift, WarmupMethod } from "@/lib/warmup/types";
import { formatKg } from "@/lib/warmup/format";
import Link from "next/link";
import { Home } from "lucide-react";

export default function StepResult({
  lift,
  method,
  warmups,
  restart,
}: {
  lift: Lift;
  method: WarmupMethod | undefined;
  warmups: WarmupSet[];
  restart: () => void;
}) {
  const router = useRouter();

  // Redirect to first step if method is undefined
  useEffect(() => {
    if (!method) {
      restart(); // reset to step 0
      router.push("/"); // or wherever your first step page is
    }
  }, [method, restart, router]);

  if (!method) return null; // render nothing while redirecting

  return (
    <div className="space-y-4">
      <p className="text-neutral-300">
        Your warm-up plan (<b>{method.toUpperCase()}</b> method):
      </p>
      <ul className="space-y-2">
        {warmups.map((s, i) => {
          const isWorkSet = i === warmups.length - 1;
          return (
            <li
              key={i}
              className={`flex justify-between bg-neutral-800/60 p-3 rounded-lg border ${
                isWorkSet ? "border-amber-400" : "border-neutral-700"
              }`}
            >
              <div>
                <div className="text-sm font-medium text-amber-400">
                  Set {i + 1}
                </div>
                <div className="text-xs text-neutral-400">
                  {lift.toUpperCase()}
                </div>
              </div>
              <div
                className={`text-right ${
                  isWorkSet ? "text-amber-400 font-semibold" : "text-amber-400"
                }`}
              >
                <div className="font-semibold">{formatKg(s.weight)} kg</div>
                <div className="text-xs text-neutral-400">
                  {s.reps} {typeof s.rpe !== "undefined" && <>— RPE {s.rpe}</>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Link href="/">
        <Button className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700">
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
