
import { createSlice } from "@reduxjs/toolkit";

// Initial Redux state for books and related UI
const initialState = {
  books: [],          // All books from the API
  loading: false,     // true when we are fetching data or performing an API operation
  error: null,        // error message (string) if something goes wrong

  // UI related state (filters & pagination)
  searchTerm: "",     // text for searching by title or author
  selectedGenre: "All", // genre filter (All, Fiction, Tech, History, etc.)
  currentPage: 1,     // current page number for pagination
  booksPerPage: 5,    // how many books we want per page (you can change to 10 if you like)
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Called when books are fetched successfully from the API
    setBooks: (state, action) => {
      state.books = action.payload;
    },

    // Called when a new book is successfully created via API
    addBookSuccess: (state, action) => {
      const newBook = action.payload;
      state.books.unshift(newBook);
    },

    // Called when an existing book is updated via API
    updateBookSuccess: (state, action) => {
      const updatedBook = action.payload;
      const id = updatedBook.id || updatedBook._id;

      const index = state.books.findIndex(
        (book) => (book.id || book._id) === id
      );

      if (index !== -1) {
        state.books[index] = updatedBook;
      }
    },

    // Called when a book is deleted via API
    deleteBookSuccess: (state, action) => {
      const idToDelete = action.payload;
      state.books = state.books.filter(
        (book) => (book.id || book._id) !== idToDelete
      );
    },

    // Generic loading & error handlers
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    // UI filters & pagination reducers
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; 
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
      state.currentPage = 1; 
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Export actions so components can dispatch them
export const {
  setBooks,
  addBookSuccess,
  updateBookSuccess,
  deleteBookSuccess,
  setLoading,
  setError,
  setSearchTerm,
  setSelectedGenre,
  setCurrentPage,
} = bookSlice.actions;

// Export the reducer to use in store.js
export default bookSlice.reducer;
