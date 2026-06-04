import React from "react";

const HeaderShimmer = () => {
  return (
    <div className="w-full h-[50vh] md:h-[65vh] bg-zinc-950 border-b border-white/5 relative flex flex-col justify-end">
      {/* Background fading shimmer */}
      <div className="absolute inset-0 shimmer-pulse opacity-25"></div>
      
      {/* Gradient overlay mimicking the real banner */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
      
      <div className="relative z-10 w-full p-6 md:p-[5%] flex flex-col">
        {/* Title skeleton */}
        <div className="w-3/4 max-w-xl h-10 rounded-2xl shimmer-pulse mb-6"></div>
        
        {/* Description lines */}
        <div className="w-2/3 max-w-lg h-4 rounded-lg shimmer-pulse mb-3"></div>
        <div className="w-1/2 max-w-md h-4 rounded-lg shimmer-pulse mb-6"></div>
        
        {/* Badges/Metadata details */}
        <div className="flex space-x-6 mb-6">
          <div className="w-16 h-5 rounded-lg shimmer-pulse"></div>
          <div className="w-16 h-5 rounded-lg shimmer-pulse"></div>
          <div className="w-24 h-5 rounded-lg shimmer-pulse"></div>
        </div>
        
        {/* Action Button shapes */}
        <div className="flex space-x-4">
          <div className="w-36 h-12 rounded-2xl shimmer-pulse"></div>
          <div className="w-36 h-12 rounded-2xl shimmer-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderShimmer;

