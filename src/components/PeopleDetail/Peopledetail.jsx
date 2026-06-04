import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  asyncloadperson,
  removeperson,
} from "../../store/actions/personActions";
import { getTMDBImageUrl } from "../../utils/image";
import PeopleDetailShimmer from "./PeopleDetailShimmer";
import MovieDetailError from "../MovieDetails/MovieDetailError";
import noImageAvailable from "../../assets/noImageAvailable.jpg";

const Peopledetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info, loading, error } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (loading) {
    return <PeopleDetailShimmer />;
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
    <div className="w-full min-h-screen bg-[#0e0e11] text-zinc-100 flex flex-col font-sans selection:bg-violet-600/35 pb-16">
      {/* Top Navbar */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-4 flex justify-between items-center z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-zinc-900/60 hover:bg-[#6556CD] border border-white/10 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          title="Go Back"
        >
          <i className="ri-arrow-left-line text-lg"></i>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row gap-8 lg:gap-12 w-full mt-4">
        {/* Left Profile Sidebar */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex flex-col">
          <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 group shadow-black/90 mb-6 relative">
            <img
              src={
                detail.profile_path
                  ? getTMDBImageUrl(detail.profile_path, "w500")
                  : noImageAvailable
              }
              alt={detail.name}
              className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
            />
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-4 text-center md:text-left">
            {detail.name}
          </h2>

          {/* Bio Facts */}
          <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl flex flex-col gap-3.5 shadow-xl text-sm text-zinc-300">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-white/[0.03] pb-1.5">Personal Info</span>
            
            {detail.birthday && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Born</span>
                <span className="font-semibold text-zinc-200">
                  <i className="ri-cake-2-line mr-1.5 text-violet-400"></i>
                  {detail.birthday}
                </span>
              </div>
            )}
            
            {detail.deathday && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Died</span>
                <span className="font-semibold text-zinc-200">
                  <i className="ri-skull-2-line mr-1.5 text-red-400"></i>
                  {detail.deathday}
                </span>
              </div>
            )}

            {detail.place_of_birth && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Place of Birth</span>
                <span className="font-semibold text-zinc-200 leading-snug">
                  <i className="ri-map-pin-line mr-1.5 text-violet-400"></i>
                  {detail.place_of_birth}
                </span>
              </div>
            )}

            {detail.known_for_department && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Known For</span>
                <span className="font-semibold text-zinc-200">
                  <i className="ri-user-star-line mr-1.5 text-violet-400"></i>
                  {detail.known_for_department}
                </span>
              </div>
            )}
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap gap-2.5 mt-5 justify-center md:justify-start">
            {externalId.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${externalId.imdb_id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-amber-500 hover:text-black border border-zinc-800/80 hover:border-transparent flex items-center justify-center text-zinc-400 transition-all duration-150 active:scale-95 cursor-pointer shadow-md"
                title="IMDb Profile"
              >
                <i className="ri-film-line text-lg"></i>
              </a>
            )}
            {externalId.facebook_id && (
              <a
                href={`https://www.facebook.com/${externalId.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-blue-600 hover:text-white border border-zinc-800/80 hover:border-transparent flex items-center justify-center text-zinc-400 transition-all duration-150 active:scale-95 cursor-pointer shadow-md"
                title="Facebook"
              >
                <i className="ri-facebook-fill text-lg"></i>
              </a>
            )}
            {externalId.instagram_id && (
              <a
                href={`https://www.instagram.com/${externalId.instagram_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-pink-600 hover:text-white border border-zinc-800/80 hover:border-transparent flex items-center justify-center text-zinc-400 transition-all duration-150 active:scale-95 cursor-pointer shadow-md"
                title="Instagram"
              >
                <i className="ri-instagram-line text-lg"></i>
              </a>
            )}
            {externalId.twitter_id && (
              <a
                href={`https://twitter.com/${externalId.twitter_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-zinc-950 hover:text-white border border-zinc-800/80 hover:border-transparent flex items-center justify-center text-zinc-400 transition-all duration-150 active:scale-95 cursor-pointer shadow-md"
                title="Twitter / X"
              >
                <i className="ri-twitter-x-fill text-lg"></i>
              </a>
            )}
          </div>
        </div>

        {/* Right Biography & Credits Block */}
        <div className="flex-grow pt-4 flex flex-col gap-8 md:gap-10">
          {/* Biography */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-zinc-200 border-b border-white/5 pb-2 uppercase tracking-wider">Biography</h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line">
              {detail.biography
                ? detail.biography.length > 400 && !isBioExpanded
                  ? `${detail.biography.slice(0, 400)}...`
                  : detail.biography
                : "No biography available."}
            </p>
            {detail.biography && detail.biography.length > 400 && (
              <button
                onClick={() => setIsBioExpanded(!isBioExpanded)}
                className="text-[#6556CD] hover:text-white font-bold text-xs tracking-wider uppercase border border-zinc-850 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 px-3.5 py-1.5 rounded-lg transition-all duration-200 shadow-md cursor-pointer self-start active:scale-95"
              >
                {isBioExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Known For horizontal list */}
          {combinedCredits?.cast && combinedCredits.cast.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-zinc-200 border-b border-white/5 pb-2 uppercase tracking-wider">Known For</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {combinedCredits.cast.slice(0, 5).map((credit) => (
                  <Link
                    key={credit.id}
                    to={`/${credit.media_type}/details/${credit.id}`}
                    className="group"
                  >
                    <div className="bg-zinc-900/60 border border-white/5 rounded-xl overflow-hidden hover:scale-103 hover:border-white/15 transition-all duration-300 flex flex-col h-full shadow-lg shadow-black/40">
                      <div className="w-full aspect-[2/3] bg-zinc-950 overflow-hidden relative">
                        <img
                          src={
                            credit.poster_path || credit.backdrop_path || credit.profile_path
                              ? getTMDBImageUrl(credit.poster_path || credit.backdrop_path || credit.profile_path, "w300")
                              : noImageAvailable
                          }
                          alt={credit.title || credit.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3 bg-zinc-950/40 flex-grow flex items-center justify-center">
                        <p className="font-semibold text-xs text-zinc-200 group-hover:text-[#6556CD] text-center line-clamp-2 transition-colors duration-200 leading-snug">
                          {credit.title || credit.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Filmography table */}
          {combinedCredits?.cast && combinedCredits.cast.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-zinc-200 border-b border-white/5 pb-2 uppercase tracking-wider">Filmography</h3>
              <div className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/20 backdrop-blur shadow-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-900/80 border-b border-white/5 text-zinc-400 font-bold uppercase tracking-wider text-xs">
                      <th className="p-4 text-left w-20">Year</th>
                      <th className="p-4 text-left">Title</th>
                      <th className="p-4 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinedCredits.cast
                      .filter((c) => c.release_date || c.first_air_date)
                      .sort(
                        (a, b) =>
                          new Date(b.release_date || b.first_air_date) -
                          new Date(a.release_date || a.first_air_date)
                      )
                      .slice(0, 15)
                      .map((credit, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-zinc-300"
                        >
                          <td className="p-4 font-semibold text-zinc-400">
                            {(() => {
                              const dateStr = credit.release_date || credit.first_air_date;
                              if (!dateStr) return "N/A";
                              const d = new Date(dateStr);
                              return isNaN(d.getTime()) ? "N/A" : d.getFullYear();
                            })()}
                          </td>
                          <td className="p-4 font-bold text-white hover:text-[#8B5CF6] transition-colors">
                            <Link to={`/${credit.media_type}/details/${credit.id}`}>
                              {credit.title || credit.name}
                            </Link>
                          </td>
                          <td className="p-4 text-zinc-400 italic">
                            {credit.character || "N/A"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Peopledetail;

