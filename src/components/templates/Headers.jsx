import React from "react";

const Headers = ({ data }) => {
  console.log("data from pros", data);
  return (
    <div
      className="w-full h-[50vh]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    ></div>
  );
};

export default Headers;
