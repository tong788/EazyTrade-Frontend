"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface LoadingSpinnerProps {
  message?: string;
  showDetails?: boolean;
}

const LOADING_STEPS = [
  "Connecting to EazyTrade secure servers...",
  "Authenticating credentials...",
  "Loading market data & assets...",
  "Preparing your dashboard...",
];

export default function LoadingSpinner({
  message,
  showDetails = true,
}: LoadingSpinnerProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!showDetails || message) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [showDetails, message]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-[#0d202c] via-[#122c3c] to-[#09151e] overflow-hidden">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-pulse-slow [animation-delay:1.5s]" />

      {/* Glassmorphic Loader Card */}
      <div className="relative w-full max-w-md mx-4 p-8 md:p-10 rounded-2xl bg-[#122c3c]/30 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center text-center animate-slide-in">
        {/* Double Concentric Spinner + Logo */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          {/* Outer glowing ring (Spin Clockwise) */}
          <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-blue-500 border-r-blue-400 animate-spin" />
          
          {/* Inner glowing ring (Spin Counter-Clockwise) */}
          <div className="absolute inset-3 rounded-full border-4 border-white/5 border-b-cyan-400 border-l-cyan-300 animate-spin-reverse" />
          
          {/* Core pulsing glow behind the logo */}
          <div className="absolute w-20 h-20 rounded-full bg-blue-500/20 blur-md animate-pulse-slow" />

          {/* Logo container */}
          <div className="absolute w-18 h-18 rounded-full overflow-hidden flex items-center justify-center bg-[#122c3c] border border-white/15 animate-pulse-slow shadow-lg">
            <Image
              src="/png/EazyTrade.png"
              alt="EazyTrade Logo"
              width={54}
              height={54}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
          Eazy<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Trade</span>
        </h2>

        {/* Dynamic status messaging */}
        <div className="h-6 flex items-center justify-center mb-6">
          <p className="text-stone-300 text-sm font-medium transition-all duration-300 animate-pulse">
            {message || LOADING_STEPS[currentStep]}
          </p>
        </div>

        {/* Shimmering Progress Bar */}
        <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full animate-shimmer" />
        </div>

        {/* Security / Quality badge */}
        <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Secured Session
        </div>
      </div>
    </div>
  );
}
