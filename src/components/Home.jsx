import React from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";

const Home = () => {
  document.title = "Movie Mind | Rizon";
  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-screen">
        <Topnav />
      </div>
    </>
  );
};

export default Home;
