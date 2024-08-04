import React from "react";

const CardsShimmer = () => {
  return (
    <div className="mt-8 h-[calc(100vh-200px)] overflow-y-auto">
      <div className="text-2xl font-bold text-white mb-4 sticky top-0 py-2 w-48 h-8 animate-pulse bg-gray-700 rounded"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-8">
        {[...Array(14)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
          >
            <div className="w-full aspect-[2/3] bg-gray-700 animate-pulse"></div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsShimmer;
