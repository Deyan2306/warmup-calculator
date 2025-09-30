"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WarmupSet, Lift, WarmupMethod } from "@/lib/warmup/types";
import { formatKg } from "@/lib/warmup/format";
import Link from "next/link";
import { Home } from "lucide-react";
import { gsap } from "gsap";

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
  const listRef = useRef<HTMLUListElement>(null);

  // Redirect to first step if method is undefined
  useEffect(() => {
    if (!method) {
      restart();
      router.push("/");
    }
  }, [method, restart, router]);

  // Animate warmup sets sliding from left
  useEffect(() => {
    if (!listRef.current) return;

    const ctx = gsap.context(() => {
      const children = listRef.current?.children;
      if (children && children.length > 0) {
        gsap.from(children, {
          x: -50, // slide from left
          opacity: 0,
          stagger: 0.1, // stagger each set
          duration: 0.5,
          ease: "power3.out",
        });
      }
    }, listRef);

    return () => ctx.revert();
  }, [warmups]);

  if (!method) return null;

  return (
    <div className="space-y-4">
      <p className="text-neutral-300">
        Your warm-up plan (<b>{method.toUpperCase()}</b> method):
      </p>
      <ul className="space-y-2" ref={listRef}>
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
        <Button className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 cursor-pointer rounded-lg border border-neutral-700 flex items-center justify-center">
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
