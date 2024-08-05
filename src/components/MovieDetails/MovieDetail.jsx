import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removeMovie } from "../../store/actions/movieActions";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import MovieDetailShimmer from "./MovieDetailShimmer";
import MovieDetailError from "./MovieDetailError";
import HorizontalCards from "../common/HorizontalCards/HorizontalCards";
import HorizontalCardsShimmer from "../common/HorizontalCards/HorizontalCardsShimmer";

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
    <div className="w-full min-h-screen bg-gray-900 text-white relative">
      <div
        className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <nav className="flex items-center gap-4 mb-4">
              <Link
                onClick={() => navigate(-1)}
                className="text-2xl sm:text-3xl hover:text-[#6556CD] transition-colors duration-300"
              >
                <i className="ri-arrow-left-line"></i>
              </Link>
              {detail.homepage && (
                <a
                  href={detail.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#6556CD] transition-colors duration-300 text-sm sm:text-base"
                >
                  <i className="ri-external-link-line"></i>
                  <span className="hidden sm:inline">Official Site</span>
                </a>
              )}
              {externalId.wikidata_id && (
                <a
                  href={`https://www.wikidata.org/wiki/${externalId.wikidata_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#6556CD] transition-colors duration-300 text-sm sm:text-base"
                >
                  <i className="ri-global-line"></i>
                  <span className="hidden sm:inline">Wikidata</span>
                </a>
              )}
              {externalId.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${externalId.imdb_id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#6556CD] transition-colors duration-300 text-sm sm:text-base"
                >
                  <i className="ri-film-line"></i>
                  <span className="hidden sm:inline">IMDb</span>
                </a>
              )}
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              {detail.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4">
              {detail.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {videos && (
                <Link
                  to={`/movie/details/${detail.id}/trailer`}
                  className="bg-[#6556CD] text-white py-2 px-4 rounded-lg hover:bg-[#4c3e9d] transition-colors duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  <i className="ri-play-circle-line"></i>
                  Watch Trailer
                </Link>
              )}
              {watchProviders && watchProviders.flatrate && (
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base">Watch on:</span>
                  {watchProviders.flatrate.slice(0, 3).map((provider) => (
                    <a
                      key={provider.provider_id}
                      href={watchProviders.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-8 h-8 rounded-full transition-transform group-hover:scale-110"
                        title={provider.provider_name}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-gray-900">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
              alt={detail.title}
              className="w-full rounded-lg shadow-lg mb-4"
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4">
            <p className="text-base sm:text-lg mb-6">{detail.overview}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Release Date</h3>
                <p>{detail.release_date}</p>
              </div>
              <div>
                <h3 className="font-semibold">Runtime</h3>
                <p>{detail.runtime} minutes</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{detail.vote_average.toFixed(1)} / 10</p>
              </div>
              <div>
                <h3 className="font-semibold">Genres</h3>
                <p>{detail.genres.map((genre) => genre.name).join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold">Budget</h3>
                <p>${detail.budget.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Revenue</h3>
                <p>${detail.revenue.toLocaleString()}</p>
              </div>
            </div>
            {translations && translations.translations && (
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Available Languages (Top 5)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {translations.translations
                    .slice(0, 5)
                    .map((translation, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {translation.english_name}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-gray-900">
        <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
        {recommendationsLoading ? (
          <HorizontalCardsShimmer />
        ) : recommendations && recommendations.length > 0 ? (
          <HorizontalCards
            trending={recommendations}
            error={recommendationsError}
            onRetry={() => dispatch(asyncloadmovie(id))}
          />
        ) : (
          <p>No recommendations available for this movie.</p>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default Moviedetail;
