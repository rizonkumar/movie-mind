import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./templates/Topnav";
import Filtering from "./templates/Filtering";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import CardsShimmer from "./templates/CardsShimmer";
import { ErrorDisplay } from "./templates/ErrorDisplay";

const Popular = () => {
  document.title = "Move Mind | Popular";

  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPopular = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(`/${category}/popular`, {
        params: { page: pageNum },
      });
      if (pageNum === 1) {
        setPopular(data.results);
      } else {
        setPopular((prev) => [...prev, ...data.results]);
      }
      setHasMore(data.page < data.total_pages);
      setError(null);
    } catch (error) {
      console.error("Error fetching popular data:", error);
      setError("Unable to load popular content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setPopular([]);
    setLoading(true);
    getPopular(1);
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const fetchMoreData = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
      getPopular(page + 1);
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
          Popular
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <div className="flex items-center space-x-4">
            <Filtering
              title="Category"
              options={["movie", "tv"]}
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
              getPopular(1);
            }}
          />
        ) : (
          <InfiniteScroll
            dataLength={popular.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<CardsShimmer />}
            scrollableTarget="scrollableDiv"
            style={{ overflow: "visible" }}
          >
            <Cards data={popular} title={category} type="Popular" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Popular;
