import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export default function SummaryWidget() {
  // Get all books from Redux
  const books = useSelector((state) => state.books.books);

  // Derive summary numbers
  const { total, available, borrowed } = useMemo(() => {
    const total = books.length;
    const available = books.filter((b) => b.status === "Available").length;
    const borrowed = books.filter((b) => b.status === "Borrowed").length;

    return { total, available, borrowed };
  }, [books]);

  return (
    <div className="summary-widget card">
      <h2 className="card-title">Inventory Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-label">Total Books</span>
          <span className="summary-value">{total}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Available</span>
          <span className="summary-value">{available}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Borrowed</span>
          <span className="summary-value">{borrowed}</span>
        </div>
      </div>
    </div>
  );
}
