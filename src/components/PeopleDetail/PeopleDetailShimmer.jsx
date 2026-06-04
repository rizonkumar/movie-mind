import React from "react";

const PeopleDetailShimmer = () => {
  return (
    <div className="w-full min-h-screen bg-[#0e0e11] text-white flex flex-col font-sans selection:bg-violet-600/35 pb-16">
      {/* Top Navbar */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-4 flex justify-between items-center z-20">
        <div className="w-10 h-10 rounded-full bg-zinc-900/60 border border-white/10 flex items-center justify-center shadow-lg animate-pulse">
          <div className="w-4 h-4 rounded bg-zinc-800 shimmer-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row gap-8 lg:gap-12 w-full mt-4">
        {/* Left Profile Sidebar Shimmer */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex flex-col">
          {/* Profile Picture Card */}
          <div className="w-full aspect-[2/3] bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl shimmer-pulse mb-6"></div>

          {/* Name Title */}
          <div className="h-8 bg-zinc-850 rounded-xl shimmer-pulse mb-6 w-3/4 self-center md:self-start"></div>

          {/* Bio Facts Card */}
          <div className="p-5 bg-zinc-900/40 border border-white/5 rounded-2xl flex flex-col gap-4">
            <div className="h-3 bg-zinc-800/80 rounded w-1/3 shimmer-pulse mb-1"></div>
            
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-2 bg-zinc-800/40 rounded w-1/4 shimmer-pulse"></div>
                <div className="h-4 bg-zinc-800/80 rounded w-2/3 shimmer-pulse"></div>
              </div>
            ))}
          </div>

          {/* Social Icons row */}
          <div className="flex gap-2.5 mt-5 justify-center md:justify-start">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-xl bg-zinc-900/60 border border-white/5 shimmer-pulse"></div>
            ))}
          </div>
        </div>

        {/* Right Content Shimmer */}
        <div className="flex-grow flex flex-col pt-4 md:pt-0">
          {/* Biography Section */}
          <div className="flex flex-col gap-3">
            <div className="h-5 bg-zinc-800 rounded w-28 shimmer-pulse mb-2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-zinc-800/60 rounded-lg shimmer-pulse w-full"></div>
              <div className="h-4 bg-zinc-800/60 rounded-lg shimmer-pulse w-11/12"></div>
              <div className="h-4 bg-zinc-800/60 rounded-lg shimmer-pulse w-full"></div>
              <div className="h-4 bg-zinc-800/60 rounded-lg shimmer-pulse w-4/5"></div>
            </div>
          </div>

          {/* Known For Section */}
          <div className="flex flex-col mt-8">
            <div className="h-5 bg-zinc-800 rounded w-32 shimmer-pulse mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-full aspect-[2/3] bg-zinc-900/60 rounded-xl border border-white/5 shimmer-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Filmography Section */}
          <div className="flex flex-col mt-8">
            <div className="h-5 bg-zinc-800 rounded w-32 shimmer-pulse mb-4"></div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 w-full flex flex-col gap-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="h-3 bg-zinc-800/40 rounded w-12 shimmer-pulse"></div>
                <div className="h-3 bg-zinc-800/40 rounded w-16 shimmer-pulse"></div>
                <div className="h-3 bg-zinc-800/40 rounded w-12 shimmer-pulse"></div>
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <div className="h-4 bg-zinc-850 rounded w-10 shimmer-pulse"></div>
                  <div className="h-4 bg-zinc-850 rounded w-2/5 shimmer-pulse"></div>
                  <div className="h-4 bg-zinc-850 rounded w-1/4 shimmer-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailShimmer;
