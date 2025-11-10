"use client";

import React, { Suspense } from "react";
import { WarmupCalculator } from "@/components/warmup";
import { Loader } from "@/components/common";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <WarmupCalculator />
      </Suspense>
    </div>
  );
};

export default Page;
