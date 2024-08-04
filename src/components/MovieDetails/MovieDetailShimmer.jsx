import React from "react";

const MovieDetailShimmer = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="w-full h-[50vh] lg:h-[70vh] bg-gray-800 animate-pulse"></div>
      <div className="container mx-auto px-4 py-8 bg-gray-900">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="mt-4 h-8 bg-gray-800 rounded animate-pulse"></div>
            <div className="mt-2 flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-800 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="h-8 bg-gray-800 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <div className="h-4 bg-gray-800 rounded animate-pulse mb-1"></div>
                  <div className="h-3 bg-gray-800 rounded animate-pulse w-3/4"></div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="h-8 bg-gray-800 rounded animate-pulse mb-4"></div>
              <div
                className="aspect-w-16 aspect-h-9 bg-gray-800 rounded animate-pulse"
                style={{ maxWidth: "560px", maxHeight: "315px" }}
              ></div>
            </div>
            <div className="mt-8">
              <div className="h-8 bg-gray-800 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className="h-8 bg-gray-800 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailShimmer;
