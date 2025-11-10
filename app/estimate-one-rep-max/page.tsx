"use client";

import React, { Suspense } from "react";
import { CalculateOneRepMax } from "@/components/warmup";
import { Loader } from "@/components/common";

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
