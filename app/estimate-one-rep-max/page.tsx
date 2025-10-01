"use client";

import React from "react";
import CalculateOneRepMax from "../components/warmup/steps/CalculateOneRepMax";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CalculateOneRepMax />
      </Suspense>
    </div>
  );
};

export default Page;
