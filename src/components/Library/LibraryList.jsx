import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidenav from "../common/Navigation/Sidenav";
import Topnav from "../common/Navigation/Topnav";
import Cards from "../common/Cards/Cards";

const LibraryList = ({ type, title, icon }) => {
  document.title = `Movie Mind | ${title}`;

  const navigate = useNavigate();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const handleSidenavToggle = (isOpen) => {
    setIsSidenavOpen(isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  };

  const listItems = useSelector((state) => state.library[type]);
  const items = Object.values(listItems || {});

  return (
    <div className="flex flex-col xl:flex-row bg-[#0e0e11] min-h-screen w-screen">
      <Sidenav onToggle={handleSidenavToggle} />
      <div
        className={`flex-grow w-full xl:w-auto h-screen overflow-y-auto overflow-x-hidden flex flex-col ${isSidenavOpen ? "fixed inset-0 z-30" : ""
          }`}
        id="scrollableDiv"
      >
        <Topnav />
        <div className="w-full px-4 md:px-[5%] flex-grow bg-[#0e0e11] pb-12">
          <div className="flex justify-between items-center py-4 relative z-40">
            <h1 className="text-2xl sm:text-3xl text-zinc-300 font-semibold flex items-center gap-3">
              <i
                onClick={() => navigate(-1)}
                className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer mr-1"
              ></i>
              <i className={`${icon} text-[#8B5CF6]`}></i>
              {title}
            </h1>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-20 p-8 border border-white/5 bg-zinc-900/20 backdrop-blur-md rounded-3xl max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 text-3xl mb-4 shadow-md">
                <i className={icon}></i>
              </div>
              <h2 className="text-xl font-bold text-zinc-200 mb-2">Your list is empty</h2>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                Add movies and TV shows to your {title.toLowerCase()} to keep track of what you love and want to watch.
              </p>
              <Link
                to="/movies"
                className="bg-[#6556CD] hover:bg-[#5244b0] text-white py-2.5 px-6 rounded-xl shadow-md transition-all font-semibold active:scale-95 text-sm"
              >
                Discover Movies
              </Link>
            </div>
          ) : (
            <Cards data={items} title="" type={title} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryList;
