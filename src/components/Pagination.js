import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../Redux/bookSlice";

export default function Pagination() {
  const dispatch = useDispatch();

  const { books, searchTerm, selectedGenre, currentPage, booksPerPage } =
    useSelector((state) => state.books);

  // We recompute filtered length again (simple and clear for beginners).
  const totalFilteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (selectedGenre === "All") return true;
        return book.genre === selectedGenre;
      })
      .filter((book) => {
        if (!searchTerm) return true;
        const lowerSearch = searchTerm.toLowerCase();
        const titleMatch = (book.title || "").toLowerCase().includes(lowerSearch);
        const authorMatch = (book.author || "").toLowerCase().includes(lowerSearch);
        return titleMatch || authorMatch;
      }).length;
  }, [books, searchTerm, selectedGenre]);

  // Total pages = ceil(total / perPage)
  const totalPages = Math.max(
    1,
    Math.ceil(totalFilteredBooks / booksPerPage || 1)
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  if (totalFilteredBooks === 0) return null;

  return (
    <div className="pagination-container">
      <button
        className="btn btn-small"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="btn btn-small"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
