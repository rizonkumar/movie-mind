import React from "react";
import { Link } from "react-router-dom";
import { getTMDBImageUrl } from "../../../utils/image";

const Headers = ({ data }) => {
  if (!data) return null;

  const titleText = data?.name || data?.title || data?.original_name || data?.original_title;
  const overviewText = data?.overview
    ? data.overview.slice(0, 180) + "..."
    : "No description available for this title.";

  return (
    <div
      className="w-full h-[60vh] md:h-[65vh] relative flex flex-col justify-end p-6 md:p-12 overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: `url(${getTMDBImageUrl(
          data?.backdrop_path || data?.profile_path,
          "original"
        )})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Absolute flat darkening mask */}
      <div className="absolute inset-0 bg-black/35 z-0"></div>

      {/* Flat Glass Text Overlay Container */}
      <div className="relative z-10 max-w-2xl bg-zinc-950/80 border border-white/10 rounded-2xl p-5 md:p-7 backdrop-blur-md shadow-2xl flex flex-col gap-4">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {titleText}
        </h1>

        {/* Overview */}
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
          {overviewText}
          <Link
            to={`/${data.media_type || "movie"}/details/${data.id}`}
            className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors ml-1.5 font-semibold text-xs"
          >
            more
          </Link>
        </p>

        {/* Metadata Outline Badge Row */}
        <div className="flex flex-wrap gap-2.5 items-center">
          {data?.popularity && (
            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 text-red-400 px-3 py-1 rounded-xl text-xs font-semibold">
              <i className="ri-fire-line text-sm"></i>
              <span>{data.popularity.toFixed(0)}</span>
            </div>
          )}
          {data?.vote_average && (
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 text-amber-400 px-3 py-1 rounded-xl text-xs font-semibold">
              <i className="ri-star-line text-sm"></i>
              <span>{data.vote_average.toFixed(1)}</span>
            </div>
          )}
          {(data?.release_date || data?.first_air_date) && (
            <div className="flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 px-3 py-1 rounded-xl text-xs font-semibold">
              <i className="ri-calendar-line text-sm text-zinc-400"></i>
              <span>
                {new Date(data.release_date || data.first_air_date).getFullYear()}
              </span>
            </div>
          )}
        </div>

        {/* Flat Buttons */}
        <div className="flex flex-wrap gap-3 mt-1.5">
          <Link
            to={`/${data?.media_type || "movie"}/details/${data.id}/trailer`}
            className="bg-[#6556CD] hover:bg-[#5244b0] text-white py-2.5 px-5 rounded-xl transition-all duration-150 font-bold flex items-center gap-2 active:scale-95 text-sm cursor-pointer shadow-md"
          >
            <i className="ri-play-line text-base"></i>
            Watch Trailer
          </Link>
          <button className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 py-2.5 px-5 rounded-xl transition-all duration-150 font-bold flex items-center gap-2 active:scale-95 text-sm cursor-pointer shadow-md">
            <i className="ri-add-line text-base"></i>
            Add to List
          </button>
        </div>

      </div>
    </div>
  );
};

export default Headers;

