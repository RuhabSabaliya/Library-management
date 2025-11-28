import React, { useEffect, useState } from "react";

const initialFormState = {
  title: "",
  author: "",
  isbn: "",
  genre: "",
  status: "Available", // default status
};

export default function BookForm({ onSubmit, editingBook, onCancelEdit }) {
  // Local form state for controlled inputs
  const [formValues, setFormValues] = useState(initialFormState);

  // Local state for validation error messages
  const [errors, setErrors] = useState({});

  // Whenever editingBook changes (user clicked Edit), pre-fill the form
  useEffect(() => {
    if (editingBook) {
      setFormValues({
        title: editingBook.title || "",
        author: editingBook.author || "",
        isbn: editingBook.isbn || "",
        genre: editingBook.genre || "",
        status: editingBook.status || "Available",
      });
      setErrors({});
    } else {
      // If we are not editing, reset to initial form
      setFormValues(initialFormState);
      setErrors({});
    }
  }, [editingBook]);

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple validation function
  const validate = () => {
    const newErrors = {};

    // Title: at least 3 characters
    if (!formValues.title || formValues.title.trim().length < 3) {
      newErrors.title = "Title should be at least 3 characters.";
    }

    // Author: not empty
    if (!formValues.author || formValues.author.trim().length === 0) {
      newErrors.author = "Author is required.";
    }

    // ISBN: exactly 13 digits
    const isbnDigitsOnly = formValues.isbn.replace(/\D/g, "");
    if (isbnDigitsOnly.length !== 13) {
      newErrors.isbn = "ISBN must be exactly 13 digits.";
    }

    // Genre: not empty
    if (!formValues.genre || formValues.genre.trim().length === 0) {
      newErrors.genre = "Genre is required.";
    }

    setErrors(newErrors);

    // If newErrors has no keys, validation passed
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation first
    const isValid = validate();
    if (!isValid) return;

    // Prepare data to send to parent
    const bookData = {
      title: formValues.title.trim(),
      author: formValues.author.trim(),
      isbn: formValues.isbn.replace(/\D/g, ""), // keep only digits
      genre: formValues.genre.trim(),
      status: formValues.status,
    };

    onSubmit(bookData);

    // If we are adding (not editing), clear the form after submit
    if (!editingBook) {
      setFormValues(initialFormState);
      setErrors({});
    }
  };

  const isEditing = Boolean(editingBook);

  return (
    <div className="card">
      <h2 className="card-title">
        {isEditing ? "Edit Book" : "Add New Book"}
      </h2>

      <form onSubmit={handleSubmit} className="book-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        {/* Author */}
        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formValues.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
          {errors.author && <p className="error-text">{errors.author}</p>}
        </div>

        {/* ISBN */}
        <div className="form-group">
          <label htmlFor="isbn">ISBN (13 digits) *</label>
          <input
            id="isbn"
            name="isbn"
            type="text"
            value={formValues.isbn}
            onChange={handleChange}
            placeholder="e.g. 9781234567890"
          />
          {errors.isbn && <p className="error-text">{errors.isbn}</p>}
        </div>

        {/* Genre */}
        <div className="form-group">
          <label htmlFor="genre">Genre *</label>
          <select
            id="genre"
            name="genre"
            value={formValues.genre}
            onChange={handleChange}
          >
            <option value="">Select genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Tech">Tech</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="Other">Other</option>
          </select>
          {errors.genre && <p className="error-text">{errors.genre}</p>}
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formValues.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Book" : "Add Book"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
