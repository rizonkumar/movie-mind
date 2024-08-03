import React from "react";
import { Link } from "react-router-dom";

const Headers = ({ data }) => {
  console.log("data from pros", data);
  return (
    <div
      className="w-full h-[50vh] flex flex-col justify-end p-[5%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="w-[70%] text-5xl font-bold text-white">
        {data?.name || data?.title || data?.original_name || data?.original_title}
      </h1>
      <p className="w-[70%] mt-3 text-white">
        {data?.overview.slice(0, 200)}...
        <Link className="text-blue-400">more</Link>
      </p>
      <p>
        <i className="text-yellow-500 ri-megaphone-fill"></i> {data?.popularity}
        <i className="text-yellow-500 ri-album-fill"></i> {data?.vote_average}
      </p>
    </div>
  );
};

export default Headers;
