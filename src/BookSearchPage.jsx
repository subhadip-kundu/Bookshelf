// BookSearchPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function BookSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.trim() !== "") {
      setLoading(true);
      axios
        .get(`https://openlibrary.org/search.json?q=${value}&limit=10&page=1`)
        .then((response) => {
          const books = response.data.docs;
          setResults(books);
          setNoResults(books.length === 0);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      setResults([]);
      setNoResults(false);
    }
  };

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    bookshelf.push(book);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a book..."
            className="border border-gray-400 rounded-full px-6 py-3 w-full pl-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute top-4 left-4 text-gray-400" />
        </div>
        <Link
          to="/bookshelf"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          <FaBookOpen className="text-lg mr-2" />
          Go to Bookshelf
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : noResults ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No books found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((book) => (
            <div
              key={`${Math.random()}`}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150x200?text=No+Image"
                }
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-2">
                  {book.author_name && book.author_name.join(", ")}
                </p>
                <div className="text-sm text-gray-500">
                  <p>Year: {book.first_publish_year || "Unknown"}</p>
                  <p>Edition Count: {book.edition_count || "Unknown"}</p>
                  <p>Language: {book.language || "Unknown"}</p>
                  <p>Rating: {book.ratings_average || "Not Rated"}</p>
                </div>
                <button
                  onClick={() => addToBookshelf(book)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  Add to Bookshelf
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookSearchPage;