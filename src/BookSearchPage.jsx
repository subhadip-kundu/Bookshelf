import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

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
    <div className="container mx-auto mt-10 w-full">
      <div className="flex items-center justify-center gap-10 mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a book..."
            className="border border-gray-400 rounded px-4 py-2 pl-10 min-w-96 max-w-screen-sm"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
        <Link
          to="/bookshelf"
          className="flex items-center ml-4 text-blue-500 hover:text-blue-700"
        >
          <FaBookOpen className="text-xl mr-2" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((book) => (
            <div
              key={`${Math.random()}`}
              className="border border-gray-400 rounded p-4 shadow-md"
            >
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p>{book.author_name && book.author_name.join(", ")}</p>
              <button
                onClick={() => addToBookshelf(book)}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600"
              >
                Add to Bookshelf
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookSearchPage;
