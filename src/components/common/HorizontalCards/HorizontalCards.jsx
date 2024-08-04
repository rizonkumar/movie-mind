import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ trending, error, onRetry }) => {
  const errorCards = Array(7).fill(null);

  return (
    <div className="w-full h-auto sm:h-[54vh] p-4 sm:p-[44px] pt-4">
      {error && (
        <div className="mb-4">
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors flex items-center"
          >
            <i className="ri-refresh-line mr-1"></i> Retry
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:flex sm:space-x-4 sm:overflow-x-auto gap-4 sm:gap-0 pb-4">
        {error
          ? errorCards.map((_, index) => (
              <div
                key={index}
                className="w-full sm:w-[200px] md:w-[15%] h-[40vh] bg-zinc-800 rounded overflow-hidden flex flex-col items-center justify-center"
              >
                <div className="text-red-500 text-4xl mb-2">
                  <i className="ri-error-warning-fill"></i>
                </div>
                <h2 className="text-lg font-bold text-white mb-1 text-center px-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-xs text-zinc-400 mb-2 text-center px-2">
                  Unable to load content.
                </p>
              </div>
            ))
          : trending.map((item) => (
              <Link
                to={`/${item.media_type}/details/${item.id}`}
                key={item.id}
                className="w-full sm:w-[200px] md:w-[15%] h-[40vh] bg-zinc-800 rounded overflow-hidden relative group"
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
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
