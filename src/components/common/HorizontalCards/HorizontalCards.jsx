import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ trending, error, onRetry }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const cardWidth = 250; // Adjust this value based on your card width
    const visibleCards = 5; // Number of cards visible at once

    const scroll = (direction) => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setScrollPosition(container.scrollLeft + scrollAmount);
        }
    };

    const showLeftArrow = scrollPosition > 0;
    const showRightArrow = trending && scrollPosition < (trending.length - visibleCards) * cardWidth;

    return (
        <div className="w-full h-auto p-4 sm:p-[44px] pt-4 relative">
            {error && (
                <div className="mb-4">
                    <button
                        onClick={onRetry}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors flex items-center"
                    >
                        <i className="ri-refresh-line mr-1"></i> Retry
                    </button>
                </div>
            )}
            <div className="relative">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                    >
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                )}
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {error
                        ? Array(visibleCards).fill(null).map((_, index) => (
                            <div
                                key={index}
                                className="w-[250px] h-[40vh] flex-shrink-0 mx-2 bg-zinc-800 rounded overflow-hidden flex flex-col items-center justify-center"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <div className="text-red-500 text-4xl mb-2">
                                    <i className="ri-error-warning-fill"></i>
                                </div>
                                <h2 className="text-lg font-bold text-white mb-1 text-center px-2">
                                    Oops! Something went wrong
                                </h2>
                                <p className="text-xs text-zinc-400 mb-2 text-center px-2">
                                    Unable to load content.
                                </p>
                            </div>
                        ))
                        : trending.map((item) => (
                            <Link
                                to={`/${item.media_type}/details/${item.id}`}
                                key={item.id}
                                className="w-[250px] h-[40vh] flex-shrink-0 mx-2 bg-zinc-800 rounded relative group"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}
                                    alt={item.title || item.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
                                    <h2 className="text-white font-bold text-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.title || item.name}
                                    </h2>
                                    <div className="flex justify-between text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span title="Popularity" className="flex items-center">
                        <i className="ri-fire-fill mr-1 text-red-500"></i>
                          {item.popularity.toFixed(1)}
                      </span>
                                        <span title="Vote Average" className="flex items-center">
                        <i className="ri-star-fill mr-1 text-yellow-500"></i>
                                            {item.vote_average.toFixed(1)}
                      </span>
                                        <span title="Release Date" className="flex items-center">
                        <i className="ri-calendar-event-fill mr-1 text-green-500"></i>
                                            {(item.release_date || item.first_air_date || "").split("-")[0]}
                      </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                    >
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default HorizontalCards;