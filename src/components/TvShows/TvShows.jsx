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

const TvShows = () => {
  document.title = "Move Mind | TvShows";

  const navigate = useNavigate();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const handleSidenavToggle = (isOpen) => {
    setIsSidenavOpen(isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  };
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
              TV Shows
            </h1>
            <div className="flex gap-3 items-center w-full sm:w-auto mt-2 sm:mt-0">
              <Filtering
                title="Category"
                options={["popular", "top_rated", "on_the_air", "airing_today"]}
                onCategoryChange={handleCategoryChange}
                selectedOption={category}
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
              <Cards data={shows} title="tv" type="TV Shows" />
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default TvShows;
