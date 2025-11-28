import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import "../styles/Table.css";

export default function BookTable({ onEdit, onDelete, onToggleStatus }) {
  // Get all necessary data from Redux
  const { books, searchTerm, selectedGenre, currentPage, booksPerPage } =
    useSelector((state) => state.books);

  // Filter + search logic in a memo to avoid recalculating on every render
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Genre filter: if "All" show everything, else match exact genre
        if (selectedGenre === "All") return true;
        return book.genre === selectedGenre;
      })
      .filter((book) => {
        // Search by title or author (case-insensitive)
        if (!searchTerm) return true;

        const lowerSearch = searchTerm.toLowerCase();
        const titleMatch = (book.title || "").toLowerCase().includes(lowerSearch);
        const authorMatch = (book.author || "").toLowerCase().includes(lowerSearch);

        return titleMatch || authorMatch;
      });
  }, [books, searchTerm, selectedGenre]);

  // Pagination: calculate the books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  if (books.length === 0) {
    return <p className="info-message">No books found. Try adding some!</p>;
  }

  return (
    <div className="card">
      <h2 className="card-title">Books List</h2>
      <div className="table-wrapper">
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Status</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => {
              const id = book.id || book._id;

              return (
                <tr key={id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.status}</td>
                  <td>
                    <button
                      className="btn btn-small btn-primary"
                      onClick={() => onEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-small btn-secondary"
                      onClick={() => onToggleStatus(book)}
                    >
                      {book.status === "Borrowed" ? "Return" : "Borrow"}
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Show message if filters remove everything */}
            {currentBooks.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No books match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
