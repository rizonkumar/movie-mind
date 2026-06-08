import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, toggleWatchlist, toggleWatched } from "../../store/reducers/librarySlice";

const LibraryActions = ({ detail, mediaType }) => {
  const dispatch = useDispatch();
  const id = detail?.id;

  const isFavorite = useSelector((state) => !!state.library.favorites[id]);
  const isInWatchlist = useSelector((state) => !!state.library.watchlist[id]);
  const isWatched = useSelector((state) => !!state.library.watched[id]);

  if (!detail) return null;

  const itemToStore = {
    id: detail.id,
    title: detail.title || detail.name || "",
    name: detail.name || detail.title || "",
    poster_path: detail.poster_path,
    backdrop_path: detail.backdrop_path,
    vote_average: detail.vote_average,
    popularity: detail.popularity,
    release_date: detail.release_date || null,
    first_air_date: detail.first_air_date || null,
    media_type: mediaType,
  };

  const handleFavorite = () => {
    dispatch(toggleFavorite(itemToStore));
  };

  const handleWatchlist = () => {
    dispatch(toggleWatchlist(itemToStore));
  };

  const handleWatched = () => {
    dispatch(toggleWatched(itemToStore));
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleFavorite}
        className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
          isFavorite
            ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
            : "bg-zinc-900/60 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-zinc-800/80"
        }`}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        <i className={`${isFavorite ? "ri-heart-3-fill" : "ri-heart-3-line"} text-xl`}></i>
      </button>

      <button
        onClick={handleWatchlist}
        className={`px-4 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg active:scale-95 gap-2 text-sm font-bold ${
          isInWatchlist
            ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
            : "bg-zinc-900/60 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-zinc-800/80"
        }`}
        title={isInWatchlist ? "Remove from Watchlist" : "Want to Watch"}
      >
        <i className={`${isInWatchlist ? "ri-bookmark-fill" : "ri-bookmark-line"} text-lg`}></i>
        <span>{isInWatchlist ? "In Watchlist" : "Want to Watch"}</span>
      </button>

      <button
        onClick={handleWatched}
        className={`px-4 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg active:scale-95 gap-2 text-sm font-bold ${
          isWatched
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
            : "bg-zinc-900/60 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-zinc-800/80"
        }`}
        title={isWatched ? "Remove from Watched" : "Mark as Watched"}
      >
        <i className={`${isWatched ? "ri-checkbox-circle-fill" : "ri-checkbox-circle-line"} text-lg`}></i>
        <span>{isWatched ? "Watched" : "Mark Watched"}</span>
      </button>
    </div>
  );
};

export default LibraryActions;
