import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchTV, getPopularTV } from "../services/api";
import "../css/Home.css";

function TVShows() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setSearchQuery("");
      setError(null);
      try {
        setShows(await getPopularTV());
      } catch {
        setError("Failed to load TV shows...");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [location.key]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;
    setLoading(true);
    try {
      setShows(await searchTV(searchQuery));
      setError(null);
    } catch {
      setError("Failed to search TV shows...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for TV shows..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {shows.map((show) => (
            <MovieCard movie={show} key={show.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TVShows;