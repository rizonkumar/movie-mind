import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removeMovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";

const Moviedetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  console.log("info", info);
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, []);

  return info ? (
    <div
      className="w-screen h-screen px-[10%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info?.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <nav className=" h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-2xl ">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-fill">Enternal Links</i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info?.externalId?.wikidata_id}`}
        >
          <i class="ri-global-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info?.externalId?.imdb_id}/`}
        >
          imdb
        </a>
      </nav>
    </div>
  ) : (
    "We will add shimmer UI later on"
  );
};

export default Moviedetail;
