import React from "react";

const HorizontalCards = ({ trending }) => {
  return (
    <div className="w-full h-[54vh] p-[44px]">
      <div className="mb-5">
        <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {trending.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[15%] h-[40vh] bg-zinc-800 rounded overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
