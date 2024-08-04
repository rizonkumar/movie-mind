import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removeMovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";

const Moviedetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      className="w-screen h-screen px-[10%] text-white"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info?.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Part - 1 */}
      <nav className="h-[10vh] w-full flex items-center gap-6 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="text-3xl hover:text-[#6556CD] transition-colors duration-300"
        >
          <i className="ri-arrow-left-line"></i>
        </Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={info.detail.homepage}
          className="flex items-center gap-2 hover:text-[#6556CD] transition-colors duration-300"
        >
          <i className="ri-external-link-line"></i>
          <span>Official Site</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info?.externalId?.wikidata_id}`}
          className="flex items-center gap-2 hover:text-[#6556CD] transition-colors duration-300"
        >
          <i className="ri-global-line"></i>
          <span>Wikidata</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info?.externalId?.imdb_id}/`}
          className="flex items-center gap-2 hover:text-[#6556CD] transition-colors duration-300"
        >
          <i className="ri-film-line"></i>
          <span>IMDb</span>
        </a>
      </nav>

      {/* Part - 2 Poster and details */}
      <div className="mt-8">
        <h1 className="text-4xl font-bold">{info.detail.title}</h1>
        <p className="mt-4 text-lg">{info.detail.overview}</p>
        {/* Add more details, ratings, cast, etc. */}
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="animate-pulse text-2xl">Loading...</div>
    </div>
  );
};

export default Moviedetail;
