"use client";

import React from "react";
import WarmupCalculatorGuided from "../components/WarmupCalculator";
import { Suspense } from "react";
import Loader from "../components/Loader";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <WarmupCalculatorGuided />
      </Suspense>
    </div>
  );
};

export default Page;
