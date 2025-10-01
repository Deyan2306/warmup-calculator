"use client";

import React from "react";
import WarmupCalculatorGuided from "../components/WarmupCalculator";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <WarmupCalculatorGuided />
      </Suspense>
    </div>
  );
};

export default Page;
