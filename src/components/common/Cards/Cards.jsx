import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardItem = ({ item, title, type }) => {
  const [imageError, setImageError] = useState(false);

  const hasPoster = item.poster_path || item.profile_path || item.backdrop_path;
  const imageUrl = `https://image.tmdb.org/t/p/w500${
    item.poster_path || item.profile_path || item.backdrop_path
  }`;

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/15 hover:shadow-2xl hover:shadow-[#6556cd]/5 h-full flex flex-col relative group cursor-pointer">
      {!imageError && hasPoster ? (
        <img
          src={imageUrl}
          alt={item.title || item.name}
          onError={() => setImageError(true)}
          className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        /* Premium Gradient Fallback UI */
        <div className="w-full aspect-[2/3] bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-6 text-center border-b border-white/5 relative">
          <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-50"></div>
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 text-2xl mb-3 shadow-md">
            <i className={type === "person" ? "ri-user-line" : "ri-film-line"}></i>
          </div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            {type === "person" ? "Artist Profile" : "No Poster"}
          </span>
          <span className="text-sm font-semibold text-zinc-300 line-clamp-2 px-2">
            {item.title || item.name}
          </span>
        </div>
      )}

      {/* Fade overlay for image readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

      {/* Bottom Information overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
        <h3 className="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-[#8B5CF6] transition-colors duration-200 line-clamp-2 leading-snug">
          {item.title || item.name}
        </h3>

        {/* Expandable/Sliding Details Panel on hover */}
        <div className="h-0 overflow-hidden group-hover:h-5 group-hover:mt-2 transition-all duration-300 flex justify-between items-center text-[10px] sm:text-xs text-zinc-300 border-t border-white/5 pt-0 group-hover:pt-2">
          <span title="Popularity" className="flex items-center font-medium text-red-400">
            <i className="ri-fire-fill mr-1 text-red-500"></i>
            {item.popularity?.toFixed(0)}
          </span>
          {type !== "person" ? (
            <>
              <span title="Rating" className="flex items-center font-medium text-yellow-400">
                <i className="ri-star-fill mr-1 text-yellow-500"></i>
                {item.vote_average?.toFixed(1) || "N/A"}
              </span>
              <span title="Release Year" className="flex items-center text-zinc-400 font-medium">
                <i className="ri-calendar-event-line mr-1 text-zinc-500"></i>
                {item.release_date || item.first_air_date
                  ? new Date(item.release_date || item.first_air_date).getFullYear()
                  : "N/A"}
              </span>
            </>
          ) : (
            <span title="Department" className="flex items-center text-violet-400 font-medium">
              <i className="ri-user-star-line mr-1 text-violet-500"></i>
              {item.known_for_department || "N/A"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Cards = ({ data, title, type }) => {
  if (!data) return null;

  return (
    <div className="mt-8 px-4">
      <h2 className="text-2xl font-bold text-white mb-6 bg-transparent py-2 border-b border-white/5">
        {type} {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-8">
        {data?.map((item, index) => (
          <Link
            key={index}
            to={`/${item.media_type || title}/details/${item.id}`}
          >
            <CardItem item={item} title={title} type={type} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
