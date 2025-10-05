"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import Image from "next/image";
import countryList from "react-select-country-list";

interface StepPersonalProps {
  data: {
    name: string;
    surname: string;
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

  const selectedCountry = countries.find((c) => c.label === data.nationality);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!showDropdown) return;
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(searchCountry.toLowerCase())
      );
      if (e.key === "ArrowDown") {
        setHighlightIndex((prev) => (prev + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        setHighlightIndex(
          (prev) => (prev - 1 + filtered.length) % filtered.length
        );
      }
      if (e.key === "Enter") {
        handleSelectCountry(filtered[highlightIndex]);
      }
      if (e.key === "Escape") setShowDropdown(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showDropdown, searchCountry, highlightIndex]);

  const filteredCountries = countries.filter((c) =>
    c.label.toLowerCase().includes(searchCountry.toLowerCase())
  );

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* First Name */}
      {subStep === 0 && (
        <div className="space-y-3">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            We need to know your first name
          </p>
          <Input
            placeholder="First Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
          />
          <Button
            disabled={data.name.trim().length < 2}
            onClick={() => setSubStep(1)}
            className={`w-full py-3 rounded-xl cursor-pointer font-semibold ${
              data.name.trim().length >= 2
                ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
            }`}
          >
            Next
          </Button>
        </div>
      )}

      {/* Surname */}
      {subStep === 1 && (
        <div className="space-y-3">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            And your surname, please
          </p>
          <Input
            placeholder="Surname"
            value={data.surname}
            onChange={(e) => setData({ ...data, surname: e.target.value })}
            className="bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400"
          />
          <div className="flex gap-3">
            <Button
              onClick={() => setSubStep(0)}
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 border border-amber-400/40 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
            <Button
              disabled={data.surname.trim().length < 2}
              onClick={() => setSubStep(2)}
              className={`flex-1 py-3 rounded-xl cursor-pointer font-semibold ${
                data.surname.trim().length >= 2
                  ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                  : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
              }`}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Nationality */}
      {subStep === 2 && (
        <div className="space-y-3 relative">
          <p className="text-neutral-300 font-semibold text-lg text-center">
            Which country are you from?
          </p>

          {/* Input with big flag */}
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
              className={`bg-neutral-800/60 border border-amber-400/40 text-amber-100 placeholder-neutral-500 focus:border-amber-400 pl-44`}
            />
          </div>

          {/* Dropdown */}
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
              className="flex-1 py-3 rounded-xl bg-neutral-800/60 text-amber-300 border border-amber-400/40 hover:bg-neutral-700 hover:text-amber-200"
            >
              Back
            </Button>
            <Button
              disabled={!data.nationality}
              onClick={next}
              className={`flex-1 py-3 cursor-pointer rounded-xl font-semibold ${
                data.nationality
                  ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
                  : "bg-neutral-800/60 text-neutral-600 cursor-not-allowed"
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
