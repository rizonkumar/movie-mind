import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log("Data", data);
      setSearch(data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  console.log("Query", query);

  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center bg-[#1F1F1F] px-4">
      <div className="relative flex items-center w-full max-w-3xl">
        <i className="absolute left-3 text-zinc-400 text-xl ri-search-2-fill"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-full py-2 pl-10 pr-10 text-lg bg-[#2C2C2C] text-white outline-none border-none rounded-full"
          type="text"
          placeholder="Search anything..."
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="absolute right-3 text-zinc-400 text-xl ri-close-fill cursor-pointer"
          ></i>
        )}

        {search.length > 0 && (
          <div className="absolute w-full max-h-[60vh] top-[120%] left-0 bg-[#2C2C2C] overflow-auto rounded-lg shadow-lg">
            {search.map((item, index) => (
              <Link
                key={index}
                to={`/${item.media_type}/${item.id}`}
                className="hover:bg-[#3A3A3A] duration-300 text-zinc-300 font-semibold w-full p-4 flex items-center border-b border-zinc-600"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${
                    item.poster_path || item.profile_path
                  }`}
                  alt={item.name || item.title}
                  className="w-10 h-14 object-cover mr-3 bg-zinc-600 rounded"
                />
                <span>
                  {item.name ||
                    item.title ||
                    item.original_name ||
                    item.original_title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Topnav;
