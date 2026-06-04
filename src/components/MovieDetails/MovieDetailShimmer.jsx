import React from "react";

const MovieDetailShimmer = () => {
  return (
    <div className="w-full min-h-screen bg-[#0e0e11] text-white flex flex-col font-sans selection:bg-violet-600/35 overflow-x-hidden">
      {/* Hero Backdrop Shimmer */}
      <div className="w-full h-[55vh] md:h-[65vh] bg-zinc-950 relative flex items-end">
        <div className="absolute inset-0 shimmer-pulse opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/50 to-transparent"></div>
      </div>

      {/* Layered Detail Layout Grid Shimmer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 relative z-10 -mt-36 md:-mt-48 flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
        {/* Left Side: Overlapping Poster Shimmer */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex flex-col">
          <div className="w-full aspect-[2/3] bg-zinc-900/80 rounded-2xl border border-white/10 shadow-2xl shimmer-pulse"></div>
          
          {/* Mock Watch Providers */}
          <div className="mt-6 p-5 bg-zinc-900/40 border border-white/5 rounded-2xl flex flex-col gap-3">
            <div className="h-3 w-28 rounded bg-zinc-800 shimmer-pulse"></div>
            <div className="flex gap-2.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-9 h-9 rounded-xl bg-zinc-800 shimmer-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Info Block Shimmer */}
        <div className="flex-grow pt-4 md:pt-16 flex flex-col gap-6 md:gap-8">
          {/* Title & Tagline Shimmer */}
          <div className="flex flex-col gap-2.5 items-center md:items-start">
            <div className="h-12 bg-zinc-800 rounded-2xl shimmer-pulse w-3/4"></div>
            <div className="h-5 bg-zinc-800/60 rounded-xl shimmer-pulse w-1/2"></div>
          </div>

          {/* Metadata Badges line Shimmer */}
          <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
            <div className="h-7 w-20 rounded-full bg-zinc-800 shimmer-pulse"></div>
            <div className="h-7 w-16 rounded-full bg-zinc-800 shimmer-pulse"></div>
            <div className="h-7 w-16 rounded-full bg-zinc-800 shimmer-pulse"></div>
            <div className="h-7 w-16 rounded-full bg-zinc-800 shimmer-pulse"></div>
          </div>

          {/* Genres row Shimmer */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <div className="h-6 w-20 rounded-full bg-zinc-800/60 shimmer-pulse"></div>
            <div className="h-6 w-24 rounded-full bg-zinc-800/60 shimmer-pulse"></div>
            <div className="h-6 w-16 rounded-full bg-zinc-800/60 shimmer-pulse"></div>
          </div>

          {/* CTA Button Shimmer */}
          <div className="flex justify-center md:justify-start">
            <div className="w-36 h-12 rounded-2xl bg-zinc-800 shimmer-pulse"></div>
          </div>

          {/* Overview Shimmer */}
          <div className="flex flex-col gap-3">
            <div className="h-6 bg-zinc-800 rounded w-28 shimmer-pulse mb-1"></div>
            <div className="space-y-3">
              <div className="h-4 bg-zinc-800/60 rounded-lg shimmer-pulse w-full"></div>
              <div className="h-4 bg-zinc-800/60 rounded-lg shimmer-pulse w-11/12"></div>
              <div className="h-4 bg-zinc-800/60 rounded-lg shimmer-pulse w-4/5"></div>
            </div>
          </div>

          {/* Stats Technical Grid Shimmer */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-zinc-900/40 border border-white/5 rounded-2xl w-full">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-3 bg-zinc-800/60 rounded w-12 shimmer-pulse mb-2"></div>
                <div className="h-4 bg-zinc-800 rounded w-20 shimmer-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations Shimmer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 bg-transparent w-full">
        <h2 className="text-lg font-bold text-zinc-200 border-b border-white/5 pb-3.5 uppercase tracking-wider">Recommendations</h2>
        <div className="flex gap-4 overflow-x-hidden -mx-4 sm:-mx-[44px] px-4 sm:px-[44px]">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-[250px] h-[40vh] flex-shrink-0 bg-zinc-900/60 rounded-2xl border border-white/5 shadow-xl shimmer-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailShimmer;


