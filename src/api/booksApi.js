import axios from "axios";

// You can change this base URL depending on your backend
export const API_BASE_URL = "https://692933789d311cddf3488a48.mockapi.io/booksdata/booksdata";

// GET /api/books
export const fetchBooksApi = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data; // expecting an array of books
};

// POST /api/books
export const createBookApi = async (bookData) => {
  const response = await axios.post(API_BASE_URL, bookData);
  return response.data; // the created book with id
};

// PUT /api/books/:id
export const updateBookApi = async (id, bookData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, bookData);
  return response.data; // the updated book
};

// DELETE /api/books/:id
export const deleteBookApi = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
