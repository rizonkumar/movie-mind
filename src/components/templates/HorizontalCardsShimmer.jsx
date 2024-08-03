import React from "react";

const HorizontalCardsShimmer = () => {
  return (
    <div className="w-full h-[54vh] p-[44px]">
      <div className="mb-5">
        <div className="w-48 h-8 bg-zinc-700 rounded animate-pulse"></div>
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[15%] h-[40vh] bg-zinc-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCardsShimmer;
