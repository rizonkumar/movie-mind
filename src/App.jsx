import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Trending from "./components/Trending";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </div>
  );
}

export default App;
