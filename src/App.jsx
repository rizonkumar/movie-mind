import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import People from "./components/People";
import Moviedetail from "./components/Moviedetail";
import TVdetail from "./components/TVdetail";
import Peopledetail from "./components/Peopledetail";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />\
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/people" element={<People />} />
        <Route path="/movie/details/:id" element={<Moviedetail />} />
        <Route path="/tv/details/:id" element={<TVdetail />} />
        <Route path="/people/details/:id" element={<Peopledetail />} />
      </Routes>
    </div>
  );
}

export default App;
