"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useAnimation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const summaryMobileRef = useRef<HTMLDivElement>(null);
  const summaryDesktopRef = useRef<HTMLDivElement>(null);

  const animateCard = (step: number) => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  };

  const animateSummary = () => {
    const animate = (el: HTMLDivElement | null) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    };
    animate(summaryMobileRef.current);
    animate(summaryDesktopRef.current);
  };

  const animateIn = (element: HTMLElement | null, options?: gsap.TweenVars) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", ...options }
    );
  };

  const animateOut = (element: HTMLElement | null, options?: gsap.TweenVars) => {
    if (!element) return;
    gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      ...options,
    });
  };

  return {
    cardRef,
    summaryMobileRef,
    summaryDesktopRef,
    animateCard,
    animateSummary,
    animateIn,
    animateOut,
  };
}
