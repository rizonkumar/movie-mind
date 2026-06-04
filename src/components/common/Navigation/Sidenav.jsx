import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
    `group flex items-center py-2.5 px-4 rounded-xl font-bold transition-all duration-300 text-sm cursor-pointer ${
      isActive
        ? "nav-active-glow text-white shadow-lg"
        : "text-zinc-400 hover:translate-x-1.5 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Drawer Trigger Button */}
      <button
        className="xl:hidden fixed top-4 left-4 z-50 text-white w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-all backdrop-blur-md"
        onClick={toggleSidenav}
        aria-label="Toggle Navigation menu"
      >
        <i className={`ri-${isOpen ? "close" : "menu"}-line text-xl`}></i>
      </button>

      {/* Mobile Backdrop Blur Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidenav}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-35 xl:hidden cursor-pointer transition-opacity duration-300"
        />
      )}

      {/* Sidebar Drawer Container */}
      <div
        className={`w-[280px] xl:w-[240px] h-screen bg-zinc-950/80 backdrop-blur-md border-r border-white/5 p-5 flex flex-col fixed top-0 left-0 xl:static transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        } z-40 shadow-2xl xl:shadow-none`}
      >
        {/* Brand Header */}
        <h1 className="text-xl font-black mb-8 flex items-center px-2 pt-2 xl:pt-0">
          <i className="text-[#8B5CF6] ri-movie-2-line text-2xl mr-2.5 animate-pulse"></i>
          <span className="tracking-wide bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent font-extrabold filter drop-shadow">
            Movie Mind
          </span>
        </h1>
        
        {/* Navigation Feeds */}
        <nav className="flex flex-col text-zinc-400 gap-1.5 flex-grow">
          <h2 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-3 px-3 select-none">
            News Feeds
          </h2>
          <NavLink to="/trending" className={navLinkClass} onClick={handleLinkClick}>
            <i className="ri-compass-3-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            Trending
          </NavLink>
          <NavLink to="/popular" className={navLinkClass} onClick={handleLinkClick}>
            <i className="ri-star-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            Popular
          </NavLink>
          <NavLink to="/movies" className={navLinkClass} onClick={handleLinkClick}>
            <i className="ri-film-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            Movies
          </NavLink>
          <NavLink to="/tvshows" className={navLinkClass} onClick={handleLinkClick}>
            <i className="ri-tv-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            TV shows
          </NavLink>
          <NavLink to="/people" className={navLinkClass} onClick={handleLinkClick}>
            <i className="ri-user-line mr-3 text-lg transition-colors group-hover:text-white"></i>
            People
          </NavLink>
        </nav>

        {/* Divider */}
        <hr className="border-white/5 my-4" />

        {/* Developer Info */}
        <nav className="flex flex-col text-zinc-400 gap-1.5">
          <h2 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-3 px-3 select-none">
            Developer Info
          </h2>
          <a
            href="https://rizonkumarrahi.in/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="group flex items-center py-2.5 px-4 rounded-xl font-bold transition-all duration-300 text-sm text-zinc-400 hover:translate-x-1.5 hover:bg-white/5 hover:text-white"
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
