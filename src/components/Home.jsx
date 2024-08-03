import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Headers from "./templates/Headers";
import HeaderShimmer from "./templates/HeaderShimmer";

const Home = () => {
  document.title = "Movie Mind | Rizon";

  const [wallpaper, setWallpaper] = useState(null)
  const [loading, setLoading] = useState(true);

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomWallpaper = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
  }, []);

  return  (
    <>
      <Sidenav />
      <div className="w-[80%] h-screen">
        <Topnav />
        {loading ? <HeaderShimmer /> : <Headers data={wallpaper} />}
      </div>
    </>
  );
};

export default Home;
