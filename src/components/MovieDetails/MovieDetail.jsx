import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removeMovie } from "../../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieDetailShimmer from "./MovieDetailShimmer";
import MovieDetailError from "./MovieDetailError";

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
                        className="w-10 h-10 rounded-full transition-transform group-hover:scale-110"
                        title={provider.provider_name}
                      />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {provider.provider_name}
                      </span>
                    </a>
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
                <div
                  className="aspect-w-16 aspect-h-9"
                  style={{ maxWidth: "560px", maxHeight: "315px" }}
                >
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
            {translations && translations.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">
                  Available Languages
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {translations.map((translation, index) => (
                    <div key={index} className="bg-gray-800 p-2 rounded">
                      <p>{translation.english_name}</p>
                    </div>
                  ))}
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
