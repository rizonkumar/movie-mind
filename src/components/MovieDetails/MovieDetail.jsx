import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removeMovie } from "../../store/actions/movieActions";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { getTMDBImageUrl } from "../../utils/image";
import MovieDetailShimmer from "./MovieDetailShimmer";
import MovieDetailError from "./MovieDetailError";
import HorizontalCards from "../common/HorizontalCards/HorizontalCards";
import HorizontalCardsShimmer from "../common/HorizontalCards/HorizontalCardsShimmer";


const formatRuntime = (runtime) => {
  if (!runtime) return "N/A";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
};

const Moviedetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info, loading, error } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState(null);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (info && info.recommendations) {
      setRecommendations(info.recommendations);
      setRecommendationsLoading(false);
    }
  }, [info]);

  if (loading) {
    return <MovieDetailShimmer />;
  }

  if (error) {
    return (
      <MovieDetailError
        message={error}
        onRetry={() => dispatch(asyncloadmovie(id))}
      />
    );
  }

  if (!info) {
    return null;
  }

  const { detail, externalId, videos, watchProviders, translations } = info;

  return (
    <div className="w-full min-h-screen bg-[#0e0e11] text-zinc-100 flex flex-col font-sans selection:bg-violet-600/35 overflow-x-hidden">
      {/* Cinematic Hero Backdrop Header */}
      <div
        className="w-full h-[55vh] md:h-[65vh] bg-cover bg-center relative z-0 flex flex-col justify-between"
        style={
          detail.backdrop_path
            ? {
                backgroundImage: `url(${getTMDBImageUrl(
                  detail.backdrop_path,
                  "original"
                )})`,
              }
            : {
                background: "linear-gradient(to bottom right, #1f1f23, #0e0e11)",
              }
        }
      >
        {/* Deep linear gradient mask blending into unified page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e11]/40 via-transparent to-[#0e0e11]/40"></div>
        
        {/* Navigation Action bar */}
        <div className="relative z-10 w-full p-6 flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-[#6556CD] border border-white/10 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            title="Go Back"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>
          
          <div className="flex gap-2">
            {detail.homepage && (
              <a
                href={detail.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-[#6556CD] hover:text-white border border-white/10 text-zinc-300 flex items-center justify-center transition-all duration-200 shadow-lg"
                title="Official Website"
              >
                <i className="ri-external-link-line"></i>
              </a>
            )}
            {externalId.wikidata_id && (
              <a
                href={`https://www.wikidata.org/wiki/${externalId.wikidata_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-[#6556CD] hover:text-white border border-white/10 text-zinc-300 flex items-center justify-center transition-all duration-200 shadow-lg"
                title="Wikidata Page"
              >
                <i className="ri-global-line"></i>
              </a>
            )}
            {externalId.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${externalId.imdb_id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-[#6556CD] hover:text-white border border-white/10 text-zinc-300 flex items-center justify-center transition-all duration-200 shadow-lg"
                title="IMDb Page"
              >
                <i className="ri-film-line"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Layered Detail Layout Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 relative z-10 -mt-36 md:-mt-48 flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
        {/* Left Side: Overlapping Poster & Providers */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex flex-col">
          <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 group shadow-black/90">
            <img
              src={getTMDBImageUrl(detail.poster_path, "w500")}
              alt={detail.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </div>

          {/* Providers */}
          {watchProviders && watchProviders.flatrate && (
            <div className="mt-6 p-5 bg-zinc-900/40 border border-white/5 rounded-2xl flex flex-col gap-3 backdrop-blur-md">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Where to Stream</span>
              <div className="flex flex-wrap gap-2.5">
                {watchProviders.flatrate.map((provider) => (
                  <a
                    key={provider.provider_id}
                    href={watchProviders.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 active:scale-95 transition-transform duration-200"
                    title={provider.provider_name}
                  >
                    <img
                      src={getTMDBImageUrl(provider.logo_path, "original")}
                      alt={provider.provider_name}
                      className="w-9 h-9 rounded-xl border border-white/10 shadow"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Primary Info Block */}
        <div className="flex-grow pt-4 md:pt-16 flex flex-col gap-6 md:gap-8">
          
          {/* Header Title section */}
          <div className="flex flex-col gap-2.5 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {detail.title}
            </h1>
            {detail.tagline && (
              <p className="text-zinc-400 italic text-base md:text-lg font-medium">
                "{detail.tagline}"
              </p>
            )}
          </div>

          {/* Metadata Badges line */}
          <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
            {/* Rating pill */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md shadow-amber-500/5">
              <i className="ri-star-fill text-sm"></i>
              <span>{detail.vote_average?.toFixed(1) || "N/A"}</span>
              <span className="text-amber-400/40 font-normal">({detail.vote_count})</span>
            </div>

            {/* Year */}
            <span className="text-zinc-300 bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              {detail.release_date ? new Date(detail.release_date).getFullYear() : "N/A"}
            </span>

            {/* Duration */}
            <span className="text-zinc-300 bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              {formatRuntime(detail.runtime)}
            </span>

            {/* Maturity level */}
            <span className="text-zinc-300 bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              {detail.adult ? "18+" : "PG-13"}
            </span>
          </div>

          {/* Genres row */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {detail.genres?.map((genre) => (
              <span
                key={genre.id}
                className="text-xs font-bold text-violet-400 bg-violet-500/5 border border-violet-500/10 px-3.5 py-1.5 rounded-full shadow-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* CTA Play trailer */}
          {videos && (
            <div className="flex justify-center md:justify-start">
              <Link
                to={`/movie/details/${detail.id}/trailer`}
                className="bg-[#6556CD] hover:bg-[#5244b0] text-white py-3.5 px-6 rounded-2xl shadow-md shadow-[#6556CD]/20 active:scale-[0.98] transition-all duration-150 inline-flex items-center gap-2 text-sm sm:text-base font-bold cursor-pointer"
              >
                <i className="ri-play-circle-line text-lg"></i>
                Watch Trailer
              </Link>
            </div>
          )}

          {/* Synopsis */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-zinc-200 border-b border-white/5 pb-2 uppercase tracking-wider">Overview</h2>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-normal">
              {detail.overview || "No overview available for this title."}
            </p>
          </div>

          {/* Stats Technical Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-zinc-900/40 border border-white/5 rounded-2xl w-full">
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Status</span>
              <span className="text-sm font-semibold text-zinc-200">{detail.status || "Released"}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Budget</span>
              <span className="text-sm font-semibold text-zinc-200">
                {detail.budget > 0 ? `$${detail.budget.toLocaleString()}` : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Revenue</span>
              <span className="text-sm font-semibold text-zinc-200">
                {detail.revenue > 0 ? `$${detail.revenue.toLocaleString()}` : "N/A"}
              </span>
            </div>
          </div>

          {/* Languages block */}
          {translations && translations.translations && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Available Languages (Top 5)
              </h3>
              <div className="flex flex-wrap gap-2">
                {translations.translations
                  .slice(0, 5)
                  .map((translation, index) => (
                    <span
                      key={index}
                      className="bg-white/5 border border-white/5 text-zinc-300 text-xs px-3 py-1.5 rounded-full font-medium"
                    >
                      {translation.english_name}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Production Companies list */}
          {detail.production_companies && detail.production_companies.length > 0 && (
            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Production Companies
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                {detail.production_companies.slice(0, 4).map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-2.5 bg-white/5 border border-white/5 rounded-xl py-2 px-3.5 shadow-sm"
                  >
                    {company.logo_path ? (
                      <img
                        src={getTMDBImageUrl(company.logo_path, "w92")}
                        alt={company.name}
                        className="h-5 object-contain filter invert brightness-200 opacity-70"
                      />
                    ) : (
                      <i className="ri-building-line text-zinc-400"></i>
                    )}
                    <span className="text-xs font-semibold text-zinc-300">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Recommendations Slider Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 bg-transparent w-full">
        <h2 className="text-lg font-bold text-zinc-200 border-b border-white/5 pb-3.5 uppercase tracking-wider">Recommendations</h2>
        {recommendationsLoading ? (
          <HorizontalCardsShimmer />
        ) : recommendations && recommendations.length > 0 ? (
          <div className="-mx-4 sm:-mx-[44px]">
            <HorizontalCards
              trending={recommendations}
              error={recommendationsError}
              onRetry={() => dispatch(asyncloadmovie(id))}
            />
          </div>
        ) : (
          <p className="text-zinc-500 font-medium py-4">No recommendations available for this movie.</p>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default Moviedetail;

