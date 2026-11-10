import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import tmdbLogo from "./assets/tmdb-logo.svg";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <footer className="footer">
      <img src={tmdbLogo} alt="TMDB" height="15" />
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
    </MovieProvider>
  );
}

export default App;
