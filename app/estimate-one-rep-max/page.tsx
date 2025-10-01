"use client";

import React from "react";
import CalculateOneRepMax from "../components/warmup/steps/CalculateOneRepMax";
import { Suspense } from "react";
import Loader from "../components/Loader";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <CalculateOneRepMax />
      </Suspense>
    </div>
  );
};

export default Page;
