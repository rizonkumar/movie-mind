import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../../utils/axios";
import Sidenav from "../common/Navigation/Sidenav";
import Topnav from "../common/Navigation/Topnav";
import Filtering from "../common/Filtering/Filtering";
import CardsShimmer from "../common/Cards/CardsShimmer";
import { ErrorDisplay } from "../common/ErrorDisplay/ErrorDisplay";
import Cards from "../common/Cards/Cards";

const Trending = () => {
  document.title = "Move Mind | Trending";
  const navigate = useNavigate();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const handleSidenavToggle = (isOpen) => {
    setIsSidenavOpen(isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  };
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
    <div className="flex flex-col xl:flex-row bg-[#0e0e11] min-h-screen w-screen">
      <Sidenav onToggle={handleSidenavToggle} />
      <div
        className={`flex-grow w-full xl:w-auto h-screen overflow-y-auto overflow-x-hidden flex flex-col ${
          isSidenavOpen ? "fixed inset-0 z-30" : ""
        }`}
        id="scrollableDiv"
      >
        <Topnav />
        <div className="w-full px-4 md:px-[5%] flex-grow bg-[#0e0e11]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 relative z-40">
            <h1 className="text-2xl sm:text-3xl text-zinc-300 font-semibold mb-4 sm:mb-0 flex items-center gap-3">
              <i
                onClick={() => navigate(-1)}
                className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer mr-1"
              ></i>
              Trending
            </h1>
            <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto mt-4 sm:mt-0">
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
              <Cards data={trending} title={category} type="Trending" />
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trending;
