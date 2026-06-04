import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidenav = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 text-sm cursor-pointer ${
      isActive
        ? "bg-zinc-800 text-white border-l-2 border-[#6556CD] shadow-sm"
        : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
    }`;

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-all"
        onClick={toggleSidenav}
      >
        <i className={`ri-${isOpen ? "close" : "menu"}-line text-xl`}></i>
      </button>
      <div
        className={`w-full md:w-[15%] h-screen bg-zinc-950 border-r border-zinc-800/60 p-4 flex flex-col fixed md:static transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <h1 className="text-xl text-white font-bold mb-8 flex items-center px-2">
          <i className="text-[#6556CD] ri-movie-2-line text-2xl mr-2.5"></i>
          <span className="tracking-wide">Movie Mind</span>
        </h1>
        
        <nav className="flex flex-col text-zinc-400 gap-1.5 flex-grow">
          <h2 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-3 px-3">News Feeds</h2>
          <NavLink to="/trending" className={navLinkClass}>
            <i className="ri-compass-3-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            Trending
          </NavLink>
          <NavLink to="/popular" className={navLinkClass}>
            <i className="ri-star-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            Popular
          </NavLink>
          <NavLink to="/movies" className={navLinkClass}>
            <i className="ri-film-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            Movies
          </NavLink>
          <NavLink to="/tvshows" className={navLinkClass}>
            <i className="ri-tv-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            TV shows
          </NavLink>
          <NavLink to="/people" className={navLinkClass}>
            <i className="ri-user-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            People
          </NavLink>
        </nav>

        <hr className="border-zinc-800/60 my-4" />

        <nav className="flex flex-col text-zinc-400 gap-1.5">
          <h2 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-3 px-3">
            Developer Info
          </h2>
          <a
            href="https://rizonkumarrahi.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 text-sm text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
          >
            <i className="ri-global-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            <span>Portfolio Website</span>
            <i className="ri-external-link-line ml-auto text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors"></i>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
