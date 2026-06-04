import React from "react";

const CardsShimmer = () => {
  return (
    <div className="mt-8 px-4">
      <div className="w-48 h-8 mb-6 rounded-xl shimmer-pulse"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-8">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/5 shadow-xl h-full flex flex-col relative"
          >
            <div className="w-full aspect-[2/3] shimmer-pulse"></div>
            <div className="p-4 flex-grow flex flex-col justify-between bg-zinc-950/40">
              <div className="h-4 shimmer-pulse rounded-lg mb-3 w-5/6"></div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-3 shimmer-pulse rounded w-1/3"></div>
                <div className="h-3 shimmer-pulse rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsShimmer;

