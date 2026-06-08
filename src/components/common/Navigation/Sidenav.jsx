import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidenav = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
      onToggle(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center py-2.5 px-3.5 rounded-xl font-semibold transition-all duration-200 text-sm cursor-pointer ${
      isActive
        ? "bg-[#6556CD] text-white shadow-md shadow-[#6556CD]/20"
        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
    }`;

  return (
    <>
      <button
        className="xl:hidden fixed top-4 left-4 z-50 text-white w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-all backdrop-blur-md"
        onClick={toggleSidenav}
        aria-label="Toggle Navigation menu"
      >
        <i className={`ri-${isOpen ? "close" : "menu"}-line text-xl`}></i>
      </button>

      {isOpen && (
        <div
          onClick={toggleSidenav}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-35 xl:hidden cursor-pointer transition-opacity duration-300"
        />
      )}

      <div
        className={`w-[260px] xl:w-64 xl:shrink-0 h-screen bg-zinc-950 border-r border-zinc-900 p-5 flex flex-col fixed top-0 left-0 xl:static transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        } z-40`}
      >
        <div className="flex items-center px-2 pt-2 xl:pt-0 mb-8 select-none">
          <i className="text-[#6556CD] ri-movie-2-line text-2xl mr-2.5"></i>
          <span className="text-xl font-bold tracking-tight text-zinc-100">
            Movie Mind
          </span>
        </div>

        <nav className="flex flex-col text-zinc-400 gap-1.5 flex-grow">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2.5 select-none">
            News Feeds
          </h2>
          <NavLink to="/trending" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-compass-3-line"></i>
            </span>
            Trending
          </NavLink>
          <NavLink to="/popular" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-star-line"></i>
            </span>
            Popular
          </NavLink>
          <NavLink to="/movies" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-film-line"></i>
            </span>
            Movies
          </NavLink>
          <NavLink to="/tvshows" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-tv-line"></i>
            </span>
            TV shows
          </NavLink>
          <NavLink to="/people" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-user-line"></i>
            </span>
            People
          </NavLink>

          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-6 mb-2.5 px-3 select-none">
            My Library
          </h2>
          <NavLink to="/favorites" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-heart-3-line"></i>
            </span>
            Favorites
          </NavLink>
          <NavLink to="/watchlist" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-bookmark-line"></i>
            </span>
            Watchlist
          </NavLink>
          <NavLink to="/watched" className={navLinkClass} onClick={handleLinkClick}>
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-checkbox-circle-line"></i>
            </span>
            Watched
          </NavLink>
        </nav>

        <hr className="border-zinc-900 my-4" />

        <nav className="flex flex-col text-zinc-400 gap-1.5">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2.5 select-none">
            Developer Info
          </h2>
          <a
            href="https://rizonkumarrahi.in/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="group flex items-center py-2.5 px-3.5 rounded-xl font-semibold transition-all duration-200 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
          >
            <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg transition-colors group-hover:text-white">
              <i className="ri-global-line"></i>
            </span>
            <span>Portfolio Website</span>
            <i className="ri-external-link-line ml-auto text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors"></i>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
