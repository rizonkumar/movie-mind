import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Trending from "./components/Trending/Trending";
import Popular from "./components/Popular/Popular";
import Movies from "./components/Movies/Movies";
import TvShows from "./components/TvShows/TvShows";
import People from "./components/People/People";
import Moviedetail from "./components/MovieDetails/MovieDetail";
import TVDetail from "./components/TVDetail/TVdetail";
import Peopledetail from "./components/PeopleDetail/Peopledetail";
import Trailer from "./components/common/Trailer/Trailer";
import LibraryList from "./components/Library/LibraryList";

function App() {
  return (
    <div className="bg-[#0e0e11] w-screen min-h-screen flex text-zinc-100 font-sans">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/people" element={<People />} />
        <Route path="/favorites" element={<LibraryList type="favorites" title="Favorites" icon="ri-heart-3-fill" />} />
        <Route path="/watchlist" element={<LibraryList type="watchlist" title="Watchlist" icon="ri-bookmark-fill" />} />
        <Route path="/watched" element={<LibraryList type="watched" title="Watched" icon="ri-checkbox-circle-fill" />} />
        <Route path="/movie/details/:id" element={<Moviedetail />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv/details/:id" element={<TVDetail />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/people/details/:id" element={<Peopledetail />} />
      </Routes>
    </div>
  );
}

export default App;
