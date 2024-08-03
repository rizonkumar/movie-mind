import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Headers from "./templates/Headers";
import HeaderShimmer from "./templates/HeaderShimmer";
import { ErrorDisplay } from "./templates/ErrorDisplay";

const Home = () => {
  document.title = "Movie Mind | Rizon";

  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getHeaderWallpaper = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomWallpaper =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomWallpaper);
      setError(null);
    } catch (error) {
      console.log("Error: ", error);
      console.error("Error fetching data:", error);
      setError("Unable to load content. Please try again later.");
      setWallpaper(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
  }, []);

  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-screen">
        <Topnav />
        {loading ? (
          <HeaderShimmer />
        ) : error ? (
          <ErrorDisplay />
        ) : (
          <Headers data={wallpaper} />
        )}
      </div>
    </>
  );
};

export default Home;
