import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const HorizontalCardItem = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  const hasPoster = item.poster_path || item.backdrop_path || item.profile_path;
  const imageUrl = `https://image.tmdb.org/t/p/w500${
    item.poster_path || item.backdrop_path || item.profile_path
  }`;

  return (
    <div className="w-full h-full bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-white/15">
      {!imageError && hasPoster ? (
        <img
          src={imageUrl}
          alt={item.title || item.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        /* Premium Fallback for Horizontal Card */
        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-6 text-center border-b border-white/5 relative">
          <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-50"></div>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 text-xl mb-3 shadow-md">
            <i className="ri-film-line"></i>
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
            No Image
          </span>
          <span className="text-xs font-semibold text-zinc-300 line-clamp-2 px-2">
            {item.title || item.name}
          </span>
        </div>
      )}

      {/* Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300"></div>

      {/* Info panel always visible at the bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
        <h2 className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-[#8B5CF6] transition-colors duration-200">
          {item.title || item.name}
        </h2>
        
        {/* Sliding details */}
        <div className="h-0 overflow-hidden group-hover:h-5 group-hover:mt-1.5 transition-all duration-300 flex justify-between items-center text-[10px] sm:text-xs text-zinc-300 border-t border-white/5 pt-0 group-hover:pt-1.5">
          <span className="flex items-center text-red-400 font-medium">
            <i className="ri-fire-fill mr-1 text-red-500"></i>
            {item.popularity?.toFixed(0)}
          </span>
          <span className="flex items-center text-yellow-400 font-medium">
            <i className="ri-star-fill mr-1 text-yellow-500"></i>
            {item.vote_average?.toFixed(1) || "N/A"}
          </span>
          <span className="flex items-center text-zinc-400">
            <i className="ri-calendar-event-line mr-1 text-zinc-500"></i>
            {item.release_date || item.first_air_date
              ? new Date(item.release_date || item.first_air_date).getFullYear()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

const HorizontalCards = ({ trending, error, onRetry }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const cardWidth = 266; // 250px width + 16px gap
  const visibleCards = 5;

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
      }, 350);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const showLeftArrow = scrollPosition > 10;
  const showRightArrow =
    trending &&
    containerRef.current &&
    scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth - 10;

  return (
    <div className="w-full h-auto p-4 sm:p-[44px] pt-4 relative">
      {error && (
        <div className="mb-4">
          <button
            onClick={onRetry}
            className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold py-1.5 px-3 rounded-xl transition-all active:scale-95 flex items-center cursor-pointer"
          >
            <i className="ri-refresh-line mr-1.5 animate-spin"></i> Retry Connection
          </button>
        </div>
      )}
      <div className="relative group/arrows">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 text-white flex items-center justify-center z-20 cursor-pointer shadow-lg shadow-black/30 hover:scale-110 active:scale-90 transition-all duration-200 opacity-0 group-hover/arrows:opacity-100"
          >
            <i className="ri-arrow-left-s-line text-lg"></i>
          </button>
        )}
        
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {error
            ? Array(visibleCards)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-[250px] h-[40vh] flex-shrink-0 bg-zinc-950 rounded-2xl border border-red-500/10 flex flex-col items-center justify-center p-6 text-center"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-2xl mb-4">
                      <i className="ri-error-warning-line"></i>
                    </div>
                    <h2 className="text-sm font-bold text-white mb-1.5">
                      Failed to Load Card
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Check your connection or API status.
                    </p>
                  </div>
                ))
            : trending?.map((item) => {
              const mediaType = item.media_type || (item.title ? "movie" : "tv");
              return (
                <Link
                  to={`/${mediaType}/details/${item.id}`}
                  key={item.id}
                  className="w-[250px] h-[40vh] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <HorizontalCardItem item={item} />
                </Link>
              );
            })}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 text-white flex items-center justify-center z-20 cursor-pointer shadow-lg shadow-black/30 hover:scale-110 active:scale-90 transition-all duration-200 opacity-0 group-hover/arrows:opacity-100"
          >
            <i className="ri-arrow-right-s-line text-lg"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalCards;
