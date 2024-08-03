import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./templates/Topnav";
import Filtering from "./templates/Filtering";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import CardsShimmer from "./templates/CardsShimmer";
import { ErrorDisplay } from "./templates/ErrorDisplay";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTrending = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`, {
        params: { page: pageNum },
      });
      if (pageNum === 1) {
        setTrending(data.results);
      } else {
        setTrending((prev) => [...prev, ...data.results]);
      }
      setHasMore(data.page < data.total_pages);
      setError(null);
    } catch (error) {
      console.error("Error fetching trending data:", error);
      setError("Unable to load trending content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setTrending([]);
    setLoading(true);
    getTrending(1);
  }, [category, duration]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const fetchMoreData = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
      getTrending(page + 1);
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
          Trending
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <div className="flex items-center space-x-4">
            <Filtering
              title="Category"
              options={["movie", "tv", "all"]}
              onCategoryChange={handleCategoryChange}
              selectedOption={category}
            />
            <Filtering
              title="Duration"
              options={["week", "day"]}
              onCategoryChange={handleDurationChange}
              selectedOption={duration}
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
              getTrending(1);
            }}
          />
        ) : (
          <InfiniteScroll
            dataLength={trending.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<CardsShimmer />}
            scrollableTarget="scrollableDiv"
            style={{ overflow: "visible" }}
          >
            <Cards data={trending} title={category} />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Trending;
