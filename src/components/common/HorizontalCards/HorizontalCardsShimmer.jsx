import React from "react";

const HorizontalCardsShimmer = () => {
  return (
    <div className="w-full h-auto sm:h-[54vh] p-4 sm:p-[44px]">
      <div className="mb-5">
        <div className="w-48 h-8 bg-zinc-700 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        {[...Array(13)].map((_, index) => (
          <div
            key={index}
            className="w-full h-[40vh] bg-zinc-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCardsShimmer;
