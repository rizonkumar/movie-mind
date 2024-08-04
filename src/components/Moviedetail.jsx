import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removeMovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";

const Shimmer = () => (
  <div className="w-full min-h-screen bg-gray-900 text-white animate-pulse">
    <div className="w-full h-[50vh] lg:h-[70vh] bg-gray-800"></div>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg"></div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="h-8 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 bg-gray-800 rounded mb-2"></div>
          <div className="h-4 bg-gray-800 rounded mb-2"></div>
          <div className="h-4 bg-gray-800 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <div className="h-4 bg-gray-800 rounded mb-1"></div>
                <div className="h-3 bg-gray-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
    <i className="ri-error-warning-fill text-6xl text-red-500 mb-4"></i>
    <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
    <p className="text-gray-400 mb-6">{message}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Retry
    </button>
  </div>
);

const Moviedetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info, loading, error } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id]);

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error}
        onRetry={() => dispatch(asyncloadmovie(id))}
      />
    );
  }

  if (!info) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
        <Shimmer />
      </div>
    );
  }

  const { detail, externalId, videos, watchProviders } = info;
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div
        className="w-full h-[50vh] lg:h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-10">
            <nav className="flex items-center gap-6 mb-8">
              <Link
                onClick={() => navigate(-1)}
                className="text-3xl hover:text-[#6556CD] transition-colors duration-300"
              >
                <i className="ri-arrow-left-line"></i>
              </Link>
              {detail.homepage && (
                <a
                  href={detail.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#6556CD] transition-colors duration-300"
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
                  className="flex items-center gap-2 hover:text-[#6556CD] transition-colors duration-300"
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
                  className="flex items-center gap-2 hover:text-[#6556CD] transition-colors duration-300"
                >
                  <i className="ri-film-line"></i>
                  <span className="hidden sm:inline">IMDb</span>
                </a>
              )}
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {detail.title}
            </h1>
            <p className="text-lg md:text-xl mb-4">{detail.tagline}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-gray-900">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
              alt={detail.title}
              className="w-full rounded-lg shadow-lg"
            />
            {watchProviders && watchProviders.flatrate && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Watch on</h3>
                <div className="flex flex-wrap gap-2">
                  {watchProviders.flatrate.map((provider) => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-10 h-10 rounded-full"
                      title={provider.provider_name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4">
            <p className="text-lg mb-4">{detail.overview}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
            {videos && (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Trailer</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${videos.key}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Trailer"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviedetail;
