import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import NotFoundTrailer from "./NotFoundTrailer.jsx";

const Trailer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  
  const reduxVideo = useSelector((state) => state[category]?.info?.videos);
  
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reduxVideo) {
      setVideo(reduxVideo);
      setLoading(false);
    } else if (id) {
      setLoading(true);
      axios
        .get(`/${category}/${id}/videos`)
        .then(({ data }) => {
          const trailer =
            data.results.find((m) => m.type === "Trailer") ||
            data.results.find((m) => m.site === "YouTube") ||
            data.results[0];
          setVideo(trailer);
        })
        .catch((err) => {
          console.error("Error fetching video details in Trailer component:", err);
          setVideo(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [reduxVideo, id, category]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white text-3xl hover:text-[#8B5CF6] transition-colors duration-300 cursor-pointer"
          aria-label="Close trailer"
        >
          <i className="ri-close-line"></i>
        </button>
        <div className="aspect-video relative w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-3">
              <i className="ri-loader-4-line text-4xl animate-spin text-[#8B5CF6]"></i>
              <span className="text-sm font-semibold tracking-wider">Loading Trailer...</span>
            </div>
          ) : video && video.key ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.key}`}
              controls
              width="100%"
              height="100%"
              playing
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          ) : (
            <NotFoundTrailer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Trailer;
