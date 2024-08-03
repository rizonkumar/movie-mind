import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title, type }) => {
  if (!data) return null;

  return (
    <div className="mt-8 px-4">
      <h2 className="text-2xl font-bold text-white mb-4 sticky top-0 bg-[#1F1F1F] py-2">
        {type} {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-8">
        {data.map((item, index) => (
          <Link
            key={index}
            to={`/${item.media_type || title.toLowerCase()}/${item.id}`}
            className="group"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 h-full flex flex-col relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title || item.name}
                </h3>
                <div className="flex justify-between text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
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
                    {new Date(
                      item.release_date || item.first_air_date
                    ).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
