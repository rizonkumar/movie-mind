import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center bg-[#1F1F1F] px-4">
      <div className="relative flex items-center w-full max-w-3xl">
        <i className="absolute left-3 text-zinc-400 text-xl ri-search-2-fill"></i>
        <input
          className="w-full py-2 pl-10 pr-10 text-lg bg-[#2C2C2C] text-white outline-none border-none rounded-full"
          type="text"
          placeholder="Search anything..."
        />
        <i className="absolute right-3 text-zinc-400 text-xl ri-close-fill cursor-pointer"></i>

        <div className="absolute w-full max-h-[60vh] top-[120%] left-0 bg-[#2C2C2C] overflow-auto rounded-lg shadow-lg">
          <Link className="hover:bg-[#3A3A3A] duration-300 text-zinc-300 font-semibold w-full p-4 flex items-center border-b border-zinc-600">
            <img src="" alt="" className="w-10 h-10 mr-3 bg-zinc-600 rounded" />
            <span>Hellloooooooo</span>
          </Link>
          <Link className="hover:bg-[#3A3A3A] duration-300 text-zinc-300 font-semibold w-full p-4 flex items-center border-b border-zinc-600">
            <img src="" alt="" className="w-10 h-10 mr-3 bg-zinc-600 rounded" />
            <span>Hellloooooooo</span>
          </Link>
          <Link className="hover:bg-[#3A3A3A] duration-300 text-zinc-300 font-semibold w-full p-4 flex items-center border-b border-zinc-600">
            <img src="" alt="" className="w-10 h-10 mr-3 bg-zinc-600 rounded" />
            <span>Hellloooooooo</span>
          </Link>
          <Link className="hover:bg-[#3A3A3A] duration-300 text-zinc-300 font-semibold w-full p-4 flex items-center border-b border-zinc-600">
            <img src="" alt="" className="w-10 h-10 mr-3 bg-zinc-600 rounded" />
            <span>Hellloooooooo</span>
          </Link>
          <Link className="hover:bg-[#3A3A3A] duration-300 text-zinc-300 font-semibold w-full p-4 flex items-center border-b border-zinc-600">
            <img src="" alt="" className="w-10 h-10 mr-3 bg-zinc-600 rounded" />
            <span>Hellloooooooo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
