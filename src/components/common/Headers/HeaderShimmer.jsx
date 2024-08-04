import React from "react";

const HeaderShimmer = () => {
  return (
    <div className="w-full h-[50vh] md:h-[65vh] bg-gray-800 animate-pulse">
      <div className="w-full h-full flex flex-col justify-end p-4 md:p-[5%]">
        <div className="w-3/4 max-w-3xl h-8 bg-gray-700 rounded mb-4"></div>
        <div className="w-1/2 max-w-xl h-4 bg-gray-700 rounded mb-2"></div>
        <div className="w-2/3 max-w-2xl h-4 bg-gray-700 rounded mb-4"></div>
        <div className="flex space-x-4 mb-4">
          <div className="w-12 h-4 bg-gray-700 rounded"></div>
          <div className="w-12 h-4 bg-gray-700 rounded"></div>
          <div className="w-12 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="flex space-x-4">
          <div className="w-32 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-32 h-10 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderShimmer;
