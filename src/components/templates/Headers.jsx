import React from "react";
import { Link } from "react-router-dom";

const Headers = ({ data }) => {
  if (!data) return null;

  return (
    <div
      className="w-full h-[65vh] flex flex-col justify-end p-[5%] relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative z-10">
        <h1 className="w-[80%] text-6xl font-bold text-white mb-4 leading-tight">
          {data?.name ||
            data?.title ||
            data?.original_name ||
            data?.original_title}
        </h1>
        <p className="w-[70%] text-lg text-gray-300 mb-6">
          {data?.overview.slice(0, 200) || "No Information to display"}...
          <Link className="text-blue-400 hover:text-blue-300 transition-colors ml-2">
            more
          </Link>
        </p>
        <div className="flex items-center space-x-6 text-lg">
          <div className="flex items-center">
            <i className="text-yellow-500 ri-fire-fill mr-2 text-2xl"></i>
            <span className="text-white font-semibold">
              {data?.popularity.toFixed(1) || "No Information"}
            </span>
          </div>
          <div className="flex items-center">
            <i className="text-yellow-500 ri-star-fill mr-2 text-2xl"></i>
            <span className="text-white font-semibold">
              {data?.vote_average.toFixed(1) || "No Information"}
            </span>
          </div>
          <div className="flex items-center">
            <i className="text-green-500 ri-calendar-event-fill mr-2 text-2xl"></i>
            <span className="text-white font-semibold">
              {data?.release_date || data?.first_air_date || "No Information"}
            </span>
          </div>
        </div>
        <div className="mt-8 flex space-x-4">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center">
            <i className="ri-play-fill mr-2"></i> Watch Trailer Now
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center">
            <i className="ri-add-line mr-2"></i> Add to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Headers;
