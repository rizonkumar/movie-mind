import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./templates/Topnav";
import Filtering from "./templates/Filtering";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import CardsShimmer from "./templates/CardsShimmer";
import { ErrorDisplay } from "./templates/ErrorDisplay";

const People = () => {
  document.title = "Move Mind | person";

  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPerson = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(`/person/${category}`, {
        params: { page: pageNum },
      });
      if (pageNum === 1) {
        setPerson(data.results);
      } else {
        setPerson((prev) => [...prev, ...data.results]);
      }
      setHasMore(data.page < data.total_pages);
      setError(null);
    } catch (error) {
      console.error("Error fetching person data:", error);
      setError("Unable to load person content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setPerson([]);
    setLoading(true);
    getPerson(1);
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const fetchMoreData = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
      getPerson(page + 1);
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
          person
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
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
              getPerson(1);
            }}
          />
        ) : (
          <InfiniteScroll
            dataLength={person.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<CardsShimmer />}
            scrollableTarget="scrollableDiv"
            style={{ overflow: "visible" }}
          >
            <Cards data={person} title={category} type="person" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default People;
