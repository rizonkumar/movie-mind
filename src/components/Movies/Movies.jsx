import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../common/Navigation/Topnav";
import CardsShimmer from "../common/Cards/CardsShimmer";
import { ErrorDisplay } from "../common/ErrorDisplay/ErrorDisplay";
import Cards from "../common/Cards/Cards";
import Filtering from "../common/Filtering/Filtering";
import axios from "../../utils/axios";

const Movies = () => {
  document.title = "Move Mind | Movies";

  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovie = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(`/movie/${category}`, {
        params: { page: pageNum },
      });
      if (pageNum === 1) {
        setMovie(data.results);
      } else {
        setMovie((prev) => [...prev, ...data.results]);
      }
      setHasMore(data.page < data.total_pages);
      setError(null);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError("Unable to load movie content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setMovie([]);
    setLoading(true);
    getMovie(1);
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const fetchMoreData = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
      getMovie(page + 1);
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
          Movie
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <div className="flex items-center space-x-4">
            <Filtering
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
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
              getMovie(1);
            }}
          />
        ) : (
          <InfiniteScroll
            dataLength={movie.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<CardsShimmer />}
            scrollableTarget="scrollableDiv"
            style={{ overflow: "visible" }}
          >
            <Cards data={movie} title="movie" type="Movie" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Movies;
