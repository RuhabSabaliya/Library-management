import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Redux/store";

import {
  setBooks,
  setLoading,
  setError,
  addBookSuccess,
  updateBookSuccess,
  deleteBookSuccess,
} from "./Redux/bookSlice";

import {
  fetchBooksApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
} from "./api/booksApi";

import BookForm from "./components/BookForm";
import BookFilters from "./components/BookFilters";
import BookTable from "./components/BookTable";
import Pagination from "./components/Pagination";
import SummaryWidget from "./components/SummaryWidget";

import "./styles/App.css";

function AppContent() {
  const dispatch = useDispatch();

 
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  // Local state to track which book is being edited
  const [editingBook, setEditingBook] = useState(null);

  // Fetch all books on first render
  useEffect(() => {
    const loadBooks = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data = await fetchBooksApi();
        dispatch(setBooks(data));
      } catch (err) {
        console.error("Failed to fetch books:", err);
        dispatch(setError("Failed to load books. Please try again."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadBooks();
  }, [dispatch]);

  // Handle add or update from BookForm
  const handleFormSubmit = async (bookData) => {
    // If editingBook is not null -> we are in edit mode
    if (editingBook) {
      const id = editingBook.id || editingBook._id;

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const updatedBook = await updateBookApi(id, bookData);
        dispatch(updateBookSuccess(updatedBook));

        // Clear editing state so form becomes "Add" again
        setEditingBook(null);
      } catch (err) {
        console.error("Failed to update book:", err);
        dispatch(setError("Failed to update book. Please try again."));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      // Add mode
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const newBook = await createBookApi(bookData);
        dispatch(addBookSuccess(newBook));
      } catch (err) {
        console.error("Failed to add book:", err);
        dispatch(setError("Failed to add book. Please try again."));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  // When user clicks "Edit" on a row in the table
  const handleEditClick = (book) => {
    setEditingBook(book);
    // The BookForm will receive this book and pre-fill the fields
  };

  // Cancel editing (reset form back to Add mode)
  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  // When user clicks "Delete" on a row in the table
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await deleteBookApi(id);
      dispatch(deleteBookSuccess(id));
    } catch (err) {
      console.error("Failed to delete book:", err);
      dispatch(setError("Failed to delete book. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // When user clicks "Borrow/Return" button
  const handleToggleStatus = async (book) => {
    const id = book.id || book._id;
    const newStatus = book.status === "Borrowed" ? "Available" : "Borrowed";

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const updatedBook = await updateBookApi(id, {
        ...book,
        status: newStatus,
      });

      dispatch(updateBookSuccess(updatedBook));
    } catch (err) {
      console.error("Failed to update status:", err);
      dispatch(setError("Failed to change status. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Library Management System</h1>

      {/* Summary widget at the top */}
      <SummaryWidget />

      {/* Book form for Add/Edit */}
      <BookForm
        onSubmit={handleFormSubmit}
        editingBook={editingBook}
        onCancelEdit={handleCancelEdit}
      />

      {/* Filters (search + genre) */}
      <BookFilters />

      {/* Loading and error messages */}
      {loading && <p className="info-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Books table with actions */}
      <BookTable
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onToggleStatus={handleToggleStatus}
      />

      {/* Pagination controls */}
      <Pagination />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
