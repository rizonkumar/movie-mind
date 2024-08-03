import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Headers from "./templates/Headers";
import HeaderShimmer from "./templates/HeaderShimmer";
import { ErrorDisplay } from "./templates/ErrorDisplay";
import HorizontalCards from "./templates/HorizontalCards";
import HorizontalCardsShimmer from "./templates/HorizontalCardsShimmer";

const Home = () => {
  document.title = "Movie Mind | Rizon";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const { data } = await axios.get(`/trending/all/day`);
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
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    getHeaderWallpaper();
    getTrending();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getHeaderWallpaper(), getTrending()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidenav />
      <div className="w-[85%] h-screen overflow-auto overflow-x-hidden">
        <Topnav />
        {wallpaperLoading ? (
          <HeaderShimmer />
        ) : wallpaperError ? (
          <ErrorDisplay message={wallpaperError} onRetry={getHeaderWallpaper} />
        ) : (
          <Headers data={wallpaper} />
        )}
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
    </>
  );
};
export default Home;
