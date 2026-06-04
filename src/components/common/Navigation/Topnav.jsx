import axios from "../../../utils/axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import noImageAvailable from "../../../assets/noImageAvailable.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const getSearch = async () => {
    try {
      if (query.trim() !== "") {
        const { data } = await axios.get(`/search/multi?query=${query}`);
        setSearch(data.results);
      } else {
        setSearch([]);
      }
    } catch (error) {
      console.error("Error : ", error);
      setSearch([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getSearch();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Global keyboard listener for hotkeys (⌘K / Ctrl+K to focus, Escape to clear and blur)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full h-auto relative z-30 flex justify-center items-center bg-transparent py-4 xl:py-6 pl-16 pr-4 xl:px-4">
      <div className="relative flex items-center w-full max-w-2xl">
        <i className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg ri-search-line"></i>
        <input
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full py-2.5 pl-11 pr-16 text-sm bg-zinc-900 text-zinc-100 placeholder-zinc-500 border border-zinc-800/80 hover:border-zinc-700 focus:border-[#6556CD] focus:bg-zinc-950 focus:shadow-md focus:shadow-[#6556CD]/5 rounded-xl outline-none transition-all duration-200"
          type="text"
          placeholder="Search movies, TV shows or people..."
        />
        
        {/* Hotkey Indicator Badge */}
        {!isFocused && query.length === 0 && (
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/50 rounded-md shadow-sm select-none pointer-events-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}

        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-lg ri-close-line cursor-pointer transition-colors"
          ></i>
        )}

        {search.length > 0 && (
          <div className="absolute w-full max-h-[50vh] top-full left-0 bg-zinc-950/95 border border-zinc-800/80 overflow-y-auto rounded-2xl shadow-2xl mt-2.5 p-1.5 flex flex-col gap-1 z-50 backdrop-blur-md">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider border-b border-white/[0.03] mb-1 flex justify-between items-center">
              <span>Search Results</span>
              <span>Press ESC to close</span>
            </div>
            {search.map((item, index) => {
              const year = item.release_date || item.first_air_date
                ? new Date(item.release_date || item.first_air_date).getFullYear()
                : null;
              
              return (
                <Link
                  key={index}
                  to={`/${item.media_type}/details/${item.id}`}
                  onClick={() => setQuery("")}
                  className="hover:bg-zinc-900 duration-150 text-zinc-300 font-medium w-full p-2.5 flex items-center rounded-xl border-b border-white/[0.01] last:border-0 hover:text-white active:scale-[0.99] transition-all"
                >
                  <img
                    src={
                      item.poster_path || item.profile_path
                        ? `https://image.tmdb.org/t/p/w92${
                            item.poster_path || item.profile_path
                          }`
                        : noImageAvailable
                    }
                    alt={item.name || item.title}
                    className="w-9 h-12 object-cover mr-3.5 bg-zinc-800 rounded-lg shadow border border-white/5"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-zinc-100 leading-snug">
                      {item.name ||
                        item.title ||
                        item.original_name ||
                        item.original_title}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50 text-[9px]">
                        {item.media_type}
                      </span>
                      {year && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                          <span>{year}</span>
                        </>
                      )}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnav;
