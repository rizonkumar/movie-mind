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

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/people" element={<People />} />
        <Route path="/movie/details/:id" element={<Moviedetail />} />
        <Route path="/tv/details/:id" element={<TVDetail />} />
        <Route path="/people/details/:id" element={<Peopledetail />} />
      </Routes>
    </div>
  );
}

export default App;
