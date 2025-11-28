import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSelectedGenre } from "../Redux/bookSlice";

export default function BookFilters() {
  const dispatch = useDispatch();

  // Read current filter values from Redux
  const searchTerm = useSelector((state) => state.books.searchTerm);
  const selectedGenre = useSelector((state) => state.books.selectedGenre);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleGenreChange = (e) => {
    dispatch(setSelectedGenre(e.target.value));
  };

  return (
    <div className="filters-container card">
      <h2 className="card-title">Filters</h2>
      <div className="filters-row">
        {/* Search input */}
        <div className="form-group">
          <label htmlFor="search">Search (Title or Author)</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search by title or author..."
          />
        </div>

        {/* Genre dropdown */}
        <div className="form-group">
          <label htmlFor="genreFilter">Genre</label>
          <select
            id="genreFilter"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="All">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Tech">Tech</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
