import React from "react";

const HorizontalCardsShimmer = () => {
  return (
    <div className="w-full h-auto p-4 sm:p-[44px] relative">
      <div className="mb-6">
        <div className="w-48 h-8 rounded-xl shimmer-pulse"></div>
      </div>
      <div className="flex overflow-x-hidden gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-[250px] h-[40vh] flex-shrink-0 bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/5 shadow-xl flex flex-col relative"
          >
            <div className="w-full h-[70%] shimmer-pulse"></div>
            <div className="p-4 flex-grow flex flex-col justify-between bg-zinc-950/40">
              <div className="h-4 shimmer-pulse rounded-lg w-5/6"></div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-3 shimmer-pulse rounded w-1/4"></div>
                <div className="h-3 shimmer-pulse rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCardsShimmer;

