"use client";

import React from 'react'
import LandingPage from './components/LandingPage';

export const dynamic = "force-dynamic";

// TODO: Move to tRPC + Zod + TanStack Query

const Home = () => {
    return (
        <>
            <LandingPage />
        </>
    )
}

export default Home;