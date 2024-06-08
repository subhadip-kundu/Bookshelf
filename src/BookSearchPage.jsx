import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

function BookSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setNoResults(false);
      return;
    }

    setLoading(true);

    debounceTimeout.current = setTimeout(() => {
      axios
        .get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
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
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const bookExists = bookshelf.some((b) => b.key === book.key);
    if (!bookExists) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-36 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="relative flex-grow w-full md:mr-4 mb-4 md:mb-0">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a book..."
            className="border border-gray-400 rounded-full px-6 py-3 w-full pl-12 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <FaSearch className="absolute top-4 left-4 text-gray-400" />
        </div>
        <Link
          to="/bookshelf"
          className="flex items-center px-4 py-3 pl-5 font-medium min-w-48 text-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          <FaBookOpen className="text-lg mr-2" />
          Go to Bookshelf
        </Link>
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <ClipLoader color="#3b82f6" size={50} />
          <p className="text-blue-500 text-lg font-semibold animate-pulse">
            Please wait while we fetch books named "{query}"
          </p>
        </div>
      ) : noResults ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No books found.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {results.map((book) => (
            <motion.div
              key={book.key}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150x200?text=No+Image"
                }
                target="_blank"
              >
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : "https://via.placeholder.com/150x200?text=No+Image"
                  }
                  alt={book.title}
                  className="w-full h-60 object-cover transition-transform duration-300 transform hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {book.title}
                </h2>
                <p className="text-red-500 italic mb-2">
                  {book.author_name && book.author_name.join(", ")}
                </p>
                <div className="text-sm text-gray-500">
                  <p className="font-medium">
                    Year: {book.first_publish_year || "Unknown"}
                  </p>
                  <p className="font-medium">
                    Edition Count: {book.edition_count || "Unknown"}
                  </p>
                  <p className="font-medium">
                    Language:{" "}
                    {book.language ? book.language.slice(0, 1) : "Unk"}
                  </p>
                  <p className="font-medium">
                    Rating:{" "}
                    {book.ratings_average
                      ? book.ratings_average.toFixed(1)
                      : "Not Rated"}
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => addToBookshelf(book)}
                    className="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    Add to Bookshelf
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default BookSearchPage;
