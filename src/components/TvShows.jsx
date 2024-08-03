import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./templates/Topnav";
import Filtering from "./templates/Filtering";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import CardsShimmer from "./templates/CardsShimmer";
import { ErrorDisplay } from "./templates/ErrorDisplay";

const TvShows = () => {
  document.title = "Move Mind | TvShows";

  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [shows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTvShows = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(`/tv/${category}`, {
        params: { page: pageNum },
      });
      if (pageNum === 1) {
        setTvShows(data.results);
      } else {
        setTvShows((prev) => [...prev, ...data.results]);
      }
      setHasMore(data.page < data.total_pages);
      setError(null);
    } catch (error) {
      console.error("Error fetching shows data:", error);
      setError("Unable to load shows content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setTvShows([]);
    setLoading(true);
    getTvShows(1);
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const fetchMoreData = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
      getTvShows(page + 1);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#1F1F1F]">
      <div className="w-full flex items-center justify-between p-4">
        <h1 className="text-2xl text-zinc-300 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
          ></i>
          shows
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <div className="flex items-center space-x-4">
            <Filtering
              title="Category"
              options={["popular", "top_rated", "on_the_air", "airing_today"]}
              onCategoryChange={handleCategoryChange}
              selectedOption={category}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto" id="scrollableDiv">
        {loading && page === 1 ? (
          <CardsShimmer />
        ) : error ? (
          <ErrorDisplay
            message={error}
            onRetry={() => {
              setPage(1);
              getTvShows(1);
            }}
          />
        ) : (
          <InfiniteScroll
            dataLength={shows.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<CardsShimmer />}
            scrollableTarget="scrollableDiv"
            style={{ overflow: "visible" }}
          >
            <Cards data={shows} title={category} type="shows" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default TvShows;
