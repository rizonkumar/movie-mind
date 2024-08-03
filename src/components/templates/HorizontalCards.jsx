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
            className="flex-shrink-0 w-[15%] h-[40vh] bg-zinc-800 rounded overflow-hidden relative group"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
              <h2 className="text-white font-bold text-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title || item.name}
              </h2>
              <div className="flex justify-between text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span title="Popularity" className="flex items-center">
                  <i className="ri-fire-fill mr-1 text-red-500"></i>
                  {item.popularity.toFixed(1)}
                </span>
                <span title="Vote Average" className="flex items-center">
                  <i className="ri-star-fill mr-1 text-yellow-500"></i>
                  {item.vote_average.toFixed(1)}
                </span>
                <span title="Release Date" className="flex items-center">
                  <i className="ri-calendar-event-fill mr-1 text-green-500"></i>
                  {
                    (item.release_date || item.first_air_date || "").split(
                      "-"
                    )[0]
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
