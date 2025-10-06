"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import Image from "next/image";
import countryList from "react-select-country-list";

interface StepPersonalProps {
  data: {
    username: string;
    email: string;
    nationality: string;
  };
  setData: (d: any) => void;
  next: () => void;
}

export default function StepPersonal({
  data,
  setData,
  next,
}: StepPersonalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [subStep, setSubStep] = useState(0);
  const [searchCountry, setSearchCountry] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const countries = countryList().getData();
  const selectedCountry = countries.find((c) => c.label === data.nationality);
  const filteredCountries = countries.filter((c) =>
    c.label.toLowerCase().includes(searchCountry.toLowerCase())
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [subStep]);

  const handleSelectCountry = (country: { label: string; value: string }) => {
    setData({ ...data, nationality: country.label });
    setSearchCountry(country.label);
    setShowDropdown(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!showDropdown) return;
      if (e.key === "ArrowDown")
        setHighlightIndex((prev) => (prev + 1) % filteredCountries.length);
      if (e.key === "ArrowUp")
        setHighlightIndex(
          (prev) =>
            (prev - 1 + filteredCountries.length) % filteredCountries.length
        );
      if (e.key === "Enter")
        handleSelectCountry(filteredCountries[highlightIndex]);
      if (e.key === "Escape") setShowDropdown(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showDropdown, searchCountry, highlightIndex]);

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Step 0: Username */}
      {subStep === 0 && (
        <div className="space-y-3 step-one-child">
          <p className="text-neutral-400 font-semibold text-lg text-center">
            Choose a username
          </p>
          <Input
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="
              bg-neutral-800 text-amber-400 border border-amber-400
              rounded-lg px-3 py-3
              focus:ring-2 focus:ring-amber-400
              transition-all duration-300
              hover:scale-105 hover:shadow-md
            "
          />
          <Button
            onClick={() => setSubStep(1)}
            disabled={data.username.trim().length < 3}
            className={`
              w-full py-3 rounded-lg border border-amber-400/50
              transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${
                data.username.trim().length >= 3
                  ? "bg-amber-500 text-neutral-900 hover:text-amber-400"
                  : "bg-neutral-800/60 text-neutral-600"
              }
              cursor-pointer
            `}
          >
            Next
          </Button>
        </div>
      )}

      {/* Step 1: Email */}
      {subStep === 1 && (
        <div className="space-y-3 step-one-child">
          <p className="text-neutral-400 font-semibold text-lg text-center">
            Enter your email
          </p>
          <Input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="
              bg-neutral-800 text-amber-400 border border-amber-400
              rounded-lg px-3 py-3
              focus:ring-2 focus:ring-amber-400
              transition-all duration-300
              hover:scale-105 hover:shadow-md
            "
          />
          <div className="flex gap-3">
            <Button
              onClick={() => setSubStep(0)}
              className="flex-1 py-3 bg-neutral-800/70 text-amber-400 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Back
            </Button>
            <Button
              onClick={() => setSubStep(2)}
              disabled={!data.email.includes("@")}
              className={`
                flex-1 py-3 rounded-lg border border-amber-400/50
                transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${
                  data.email.includes("@")
                    ? "bg-amber-500 text-neutral-900 hover:text-amber-400"
                    : "bg-neutral-800/60 text-neutral-600"
                }
                cursor-pointer
              `}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Nationality */}
      {subStep === 2 && (
        <div className="space-y-3 relative step-one-child">
          <p className="text-neutral-400 font-semibold text-lg text-center">
            Which country are you from?
          </p>

          <div className="relative flex items-center">
            {selectedCountry && (
              <div className="absolute left-0 top-0 bottom-0 flex items-center px-2">
                <Image
                  src={`https://flagcdn.com/h40/${selectedCountry.value.toLowerCase()}.png`}
                  width={40}
                  height={40}
                  alt={selectedCountry.label}
                  className="object-cover rounded-sm"
                />
              </div>
            )}
            <Input
              placeholder="Type to search..."
              value={searchCountry}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setSearchCountry(e.target.value);
                setShowDropdown(true);
                setHighlightIndex(0);
              }}
              className="
                bg-neutral-800 text-amber-400 border border-amber-400
                rounded-lg px-3 py-3 pl-44
                focus:ring-2 focus:ring-amber-400
                transition-all duration-300
                hover:scale-105 hover:shadow-md
              "
            />
          </div>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute z-10 w-full bg-neutral-800/95 max-h-52 overflow-y-auto mt-1 rounded-lg border border-amber-400/30 shadow-lg"
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <div
                    key={country.value}
                    className={`flex items-center gap-2 p-2 cursor-pointer transition-colors ${
                      index === highlightIndex ? "bg-amber-500/20" : ""
                    } hover:bg-amber-500/20`}
                    onClick={() => handleSelectCountry(country)}
                  >
                    <Image
                      src={`https://flagcdn.com/h20/${country.value.toLowerCase()}.png`}
                      width={20}
                      height={15}
                      alt={country.label}
                      className="object-cover rounded-sm"
                    />
                    <span
                      className="text-neutral-100"
                      dangerouslySetInnerHTML={{
                        __html: country.label.replace(
                          new RegExp(searchCountry, "gi"),
                          (match) =>
                            `<mark class="bg-amber-400/30 rounded">${match}</mark>`
                        ),
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="p-2 text-neutral-500">No results found</div>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-3">
            <Button
              onClick={() => setSubStep(1)}
              className="flex-1 py-3 bg-neutral-800/70 text-amber-400 cursor-pointer rounded-lg border border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Back
            </Button>
            <Button
              onClick={next}
              disabled={!data.nationality}
              className={`
                flex-1 py-3 rounded-lg border border-amber-400/50
                transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${
                  data.nationality
                    ? "bg-amber-500 text-neutral-900 hover:text-amber-400"
                    : "bg-neutral-800/60 text-neutral-600"
                }
                cursor-pointer
              `}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
