import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Sidenav from "../common/Navigation/Sidenav";
import Topnav from "../common/Navigation/Topnav";
import HeaderShimmer from "../common/Headers/HeaderShimmer";
import { ErrorDisplay } from "../common/ErrorDisplay/ErrorDisplay";
import Headers from "../common/Headers/Headers";
import Filtering from "../common/Filtering/Filtering";
import HorizontalCardsShimmer from "../common/HorizontalCards/HorizontalCardsShimmer";
import HorizontalCards from "../common/HorizontalCards/HorizontalCards";

const Home = () => {
  document.title = "Movie Mind | Home ~ Rizon";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const [wallpaperLoading, setWallpaperLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [wallpaperError, setWallpaperError] = useState(null);
  const [trendingError, setTrendingError] = useState(null);

  const getHeaderWallpaper = async () => {
    setWallpaperLoading(true);
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomWallpaper =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomWallpaper);
      setWallpaperError(null);
    } catch (error) {
      console.error("Error fetching wallpaper data:", error);
      setWallpaperError("Unable to load content. Please try again later.");
      setWallpaper(null);
    } finally {
      setWallpaperLoading(false);
    }
  };

  const getTrending = async () => {
    setTrendingLoading(true);
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
      setTrendingError(null);
    } catch (error) {
      console.error("Error fetching trending data:", error);
      setTrendingError(
        "Unable to load trending content. Please try again later."
      );
      setTrending(null);
    } finally {
      setTrendingLoading(false);
    }
  };

  useEffect(() => {
    getTrending();
  }, [category]);

  useEffect(() => {
    getHeaderWallpaper();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#1F1E24] min-h-screen">
      <Sidenav />
      <div className="w-full md:w-[85%] h-screen overflow-auto overflow-x-hidden">
        <Topnav />
        {wallpaperLoading ? (
          <HeaderShimmer />
        ) : wallpaperError ? (
          <ErrorDisplay message={wallpaperError} onRetry={getHeaderWallpaper} />
        ) : (
          <Headers data={wallpaper} />
        )}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-[44px] pb-0 relative z-40">
          <h1 className="text-2xl sm:text-3xl text-zinc-400 font-semibold mb-4 sm:mb-0">
            Trending
          </h1>
          <Filtering
            title="Filter"
            options={["tv", "movie", "all"]}
            onCategoryChange={handleCategoryChange}
            selectedOption={category}
          />
        </div>
        {trendingLoading ? (
          <HorizontalCardsShimmer />
        ) : (
          <HorizontalCards
            trending={trending}
            error={trendingError}
            onRetry={getTrending}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
