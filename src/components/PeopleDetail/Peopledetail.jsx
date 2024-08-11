import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removeperson } from "../../store/actions/personActions";
import MovieDetailShimmer from "../MovieDetails/MovieDetailShimmer";
import MovieDetailError from "../MovieDetails/MovieDetailError";

const Peopledetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info, loading, error } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (loading) {
    return <MovieDetailShimmer />;
  }

  if (error) {
    return (
        <MovieDetailError
            message={error}
            onRetry={() => dispatch(asyncloadperson(id))}
        />
    );
  }

  if (!info) {
    return null;
  }

  const { detail, externalId, combinedCredits } = info;

  return (
      <div className="w-full min-h-screen bg-[#1F1F1F] text-white">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-8">
            <Link
                to="#"
                onClick={() => navigate(-1)}
                className="text-2xl sm:text-3xl hover:text-[#6556CD] transition-colors duration-300"
            >
              <i className="ri-arrow-left-line"></i>
            </Link>
          </nav>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img
                  src={`https://image.tmdb.org/t/p/w500${detail.profile_path}`}
                  alt={detail.name}
                  className="w-full rounded-lg shadow-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{detail.name}</h2>
              {detail.birthday && (
                  <p className="mb-2">
                    <i className="ri-cake-2-line mr-2"></i>
                    <span className="font-semibold">Born:</span> {detail.birthday}
                  </p>
              )}
              {detail.deathday && (
                  <p className="mb-2">
                    <i className="ri-skull-2-line mr-2"></i>
                    <span className="font-semibold">Died:</span> {detail.deathday}
                  </p>
              )}
              {detail.place_of_birth && (
                  <p className="mb-2">
                    <i className="ri-map-pin-line mr-2"></i>
                    <span className="font-semibold">Place of Birth:</span> {detail.place_of_birth}
                  </p>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {externalId.imdb_id && (
                    <a
                        href={`https://www.imdb.com/name/${externalId.imdb_id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-500 text-black px-2 py-1 rounded flex items-center"
                    >
                      <i className="ri-movie-line mr-1"></i> IMDb
                    </a>
                )}
                {externalId.facebook_id && (
                    <a
                        href={`https://www.facebook.com/${externalId.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 px-2 py-1 rounded flex items-center"
                    >
                      <i className="ri-facebook-fill mr-1"></i> Facebook
                    </a>
                )}
                {externalId.instagram_id && (
                    <a
                        href={`https://www.instagram.com/${externalId.instagram_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pink-600 px-2 py-1 rounded flex items-center"
                    >
                      <i className="ri-instagram-line mr-1"></i> Instagram
                    </a>
                )}
                {externalId.twitter_id && (
                    <a
                        href={`https://twitter.com/${externalId.twitter_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-400 px-2 py-1 rounded flex items-center"
                    >
                      <i className="ri-twitter-fill mr-1"></i> Twitter
                    </a>
                )}
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
              <h3 className="text-xl font-semibold mb-4">Biography</h3>
              <p className="text-base sm:text-lg mb-6">{detail.biography || "No biography available."}</p>

              <h3 className="text-xl font-semibold mb-4">Known For</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                {combinedCredits.cast.slice(0, 10).map((credit) => (
                    <div key={credit.id} className="bg-gray-800 p-2 rounded text-center">
                      <img
                          src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
                          alt={credit.title || credit.name}
                          className="w-full h-auto mb-2 rounded"
                      />
                      <p className="font-semibold text-sm">{credit.title || credit.name}</p>
                    </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">Filmography</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                  <tr className="bg-gray-800">
                    <th className="p-2 text-left">Year</th>
                    <th className="p-2 text-left">Title</th>
                    <th className="p-2 text-left">Role</th>
                  </tr>
                  </thead>
                  <tbody>
                  {combinedCredits.cast.slice(0, 20).map((credit) => (
                      <tr key={credit.id} className="border-b border-gray-700">
                        <td className="p-2">{new Date(credit.release_date || credit.first_air_date).getFullYear()}</td>
                        <td className="p-2">{credit.title || credit.name}</td>
                        <td className="p-2">{credit.character}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

};

export default Peopledetail;