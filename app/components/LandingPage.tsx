"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import Image from "next/image";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement[]>([]);
  const featureRefs = useRef<HTMLDivElement[]>([]);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const heroLogoRef = useRef<HTMLImageElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const accent1Ref = useRef<HTMLDivElement>(null);
  const accent2Ref = useRef<HTMLDivElement>(null);

  // Simplified ref assignment for notifications
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !notificationsRef.current[index]) {
      notificationsRef.current[index] = el;
    }
  };

  // Simplified ref assignment for features
  const addFeatureRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !featureRefs.current[index]) {
      featureRefs.current[index] = el;
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero animations
    if (heroTitleRef.current && heroLogoRef.current) {
      tl.fromTo(
        [heroTitleRef.current, heroLogoRef.current],
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "back.out(1.5)", stagger: 0.1 }
      );
    }
    if (heroTextRef.current) {
      tl.fromTo(
        heroTextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      );
    }
    if (heroButtonRef.current) {
      tl.fromTo(
        heroButtonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }

    // Notification container and notifications
    if (containerRef.current) {
      tl.fromTo(
        containerRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
    if (notificationsRef.current.length) {
      tl.fromTo(
        notificationsRef.current,
        { y: 10, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );
    }

    // Floating accents
    if (accent1Ref.current) {
      gsap.to(accent1Ref.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    }
    if (accent2Ref.current) {
      gsap.to(accent2Ref.current, {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
    }

    // Features section
    if (featureRefs.current.length) {
      tl.fromTo(
        featureRefs.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // CTA section
    if (ctaSectionRef.current) {
      tl.fromTo(
        ctaSectionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
    if (ctaButtonRef.current) {
      tl.fromTo(
        ctaButtonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.3"
      );
    }
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundImage: "url('/landing-page-bg.avif')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-neutral-900/30 z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center max-w-6xl w-full mt-10 md:mt-0">
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          {/* Logo + Text */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <div ref={heroLogoRef}>
              <Image
                src="/pumped-up-logo.webp"
                alt="PreppedUp Logo"
                width={180}
                height={180}
                className="drop-shadow-lg w-auto h-32 md:h-40"
              />
            </div>
            <h1
              ref={heroTitleRef}
              className="text-5xl md:text-7xl font-extrabold text-amber-400 drop-shadow-lg"
            >
              PreppedUp
            </h1>
          </div>

          <p
            ref={heroTextRef}
            className="text-amber-200 text-lg md:text-xl drop-shadow max-w-md"
          >
            Strong Lifts Start With Strong Warm-ups. Stop wasting reps and
            leaving PRs on the bar. PreppedUp generates personalized warm-ups so
            you lift smarter, faster, and safer.
          </p>

          <div className="w-full flex justify-center md:justify-start">
            <Link href="/create-warmup">
              <Button
                ref={heroButtonRef}
                className="px-12 py-5 bg-amber-400 text-neutral-900 font-bold rounded-3xl hover:bg-amber-500 transform hover:cursor-pointer hover:scale-105 transition shadow-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex flex-col items-center relative">
          <div
            ref={containerRef}
            className="w-80 bg-neutral-700/50 border border-neutral-600 rounded-3xl backdrop-blur-md shadow-2xl p-4"
          >
            {/* Notifications */}
            {["Set 1", "Set 2", "AI Tip", "CTA"].map((item, idx) => (
              <div
                key={idx}
                ref={(el) => addToRefs(el, idx)}
                className={`p-3 rounded-lg mb-3 border flex justify-between items-center ${
                  item === "AI Tip"
                    ? "bg-amber-400/20 border-amber-400"
                    : item === "CTA"
                    ? "bg-neutral-800/60 border-neutral-700 text-center text-amber-400 font-semibold"
                    : "bg-neutral-800/60 border-neutral-700"
                }`}
              >
                {item === "Set 1" && (
                  <>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-amber-400">
                        Set 1
                      </div>
                      <div className="text-xs text-neutral-200">Squat</div>
                    </div>
                    <div className="text-right text-amber-400">
                      <div className="font-semibold">60 kg</div>
                      <div className="text-xs text-neutral-200">5 reps</div>
                    </div>
                  </>
                )}
                {item === "Set 2" && (
                  <>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-amber-400">
                        Set 2
                      </div>
                      <div className="text-xs text-neutral-200">Squat</div>
                    </div>
                    <div className="text-right text-amber-400">
                      <div className="font-semibold">100 kg</div>
                      <div className="text-xs text-neutral-200">3 reps</div>
                    </div>
                  </>
                )}
                {item === "AI Tip" && (
                  <>
                    <div className="text-sm text-amber-400 font-medium">
                      AI Tip
                    </div>
                    <div className="text-xs text-neutral-100 text-right">
                      Add an extra ramp set for explosiveness!
                    </div>
                  </>
                )}
                {item === "CTA" && (
                  <div>Get your full warm-up instantly with PreppedUp</div>
                )}
              </div>
            ))}
          </div>

          {/* Floating accents */}
          <div
            ref={accent1Ref}
            className="absolute -top-4 -left-4 w-10 h-10 bg-amber-400/30 rounded-full blur-xl"
          ></div>
          <div
            ref={accent2Ref}
            className="absolute -bottom-4 -right-6 w-16 h-16 bg-amber-400/20 rounded-full blur-2xl"
          ></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 mt-20 max-w-6xl w-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
        {[
          {
            title: "Custom Warm-ups",
            desc: "Generate warm-up plans tailored to your lift and available plates.",
          },
          {
            title: "Track Intensity",
            desc: "Choose light, medium, or heavy days and optimize your performance.",
          },
          {
            title: "Safe & Efficient",
            desc: "Warm up properly and reduce the risk of injury while saving time.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            ref={(el) => addFeatureRefs(el, idx)}
            className="bg-neutral-800/60 p-8 rounded-3xl border border-neutral-700 hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 backdrop-blur-md"
          >
            <h3 className="text-amber-400 font-bold text-xl mb-3">
              {feature.title}
            </h3>
            <p className="text-neutral-200 text-sm md:text-base">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section
        ref={ctaSectionRef}
        className="relative z-10 mt-20 mb-10 flex flex-col items-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-amber-400 drop-shadow">
          Ready to Lift Smarter?
        </h2>
        <p className="text-amber-200 text-lg md:text-xl max-w-2xl text-center">
          Elite lifters don’t guess. They prepare. PreppedUp AI gives you the
          edge — every session, every lift.
        </p>
        <Link href="/create-warmup">
          <Button
            ref={ctaButtonRef}
            className="px-16 py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-900 hover:cursor-pointer font-bold rounded-full hover:scale-105 transform transition shadow-xl"
          >
            Create My Warm-up
          </Button>
        </Link>
      </section>
    </div>
  );
}
