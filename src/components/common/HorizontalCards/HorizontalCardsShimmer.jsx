import React from "react";

const HorizontalCardsShimmer = () => {
  return (
    <div className="w-full h-auto sm:h-[54vh] p-4 sm:p-[44px]">
      <div className="mb-5">
        <div className="w-48 h-8 bg-zinc-700 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:flex sm:space-x-4 sm:overflow-x-auto gap-4 sm:gap-0">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="w-full sm:w-[200px] md:w-[15%] h-[40vh] bg-zinc-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCardsShimmer;
