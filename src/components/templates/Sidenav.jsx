import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[15%] h-screen border-r-2 border-zinc-400 p-3 flex flex-col">
      <h1 className="text-2xl text-white font-bold mb-6">
        <i className="text-[#6556CD] ri-tv-2-fill"></i>
        <span className="">Movie Mind</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-lg gap-2 flex-grow">
        <h1 className="text-white font-semibold text-xl mb-3">News Feeds</h1>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-150 py-2 px-3">
          <i className="ri-fire-fill mr-2"></i>
          Trending
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-150 py-2 px-3">
          <i className="ri-star-fill mr-2"></i>
          Popular
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-150 py-2 px-3">
          <i className="ri-movie-2-fill mr-2"></i>
          Movies
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-150 py-2 px-3">
          <i className="ri-tv-fill mr-2"></i>
          TV shows
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-150 py-2 px-3">
          <i className="ri-team-fill mr-2"></i>
          People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-4" />

      <nav className="flex flex-col text-zinc-400 text-lg gap-2">
        <h1 className="text-white font-semibold text-xl mb-3">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-150 py-2 px-3">
          <i className="ri-information-line mr-2"></i>
          About - Rizon
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-150 py-2 px-3">
          <i className="ri-contacts-line mr-2"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
