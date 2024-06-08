import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

function PersonalBookshelfPage() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const removeFromBookshelf = (bookKey) => {
    const updatedBookshelf = bookshelf.filter((book) => book.key !== bookKey);
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="container mx-auto mt-10 px-4 lg:px-36">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Bookshelf</h1>
        <Link
          to="/"
          className="flex items-center px-4 py-3 pl-5 font-medium min-w-48 text-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Go Back to Home
        </Link>
      </div>
      {bookshelf.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Your bookshelf is empty.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {bookshelf.map((book) => (
            <motion.div
              key={book.key}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {book.title}
                </h2>
                <p className="text-red-500 italic mb-2">
                  {book.author_name && book.author_name.slice(0, 2).join(", ")}
                  {book.author_name && book.author_name.length > 2
                    ? ", ..."
                    : ""}
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
                <button
                  onClick={() => removeFromBookshelf(book.key)}
                  className="mt-4 flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  <FaTrash className="mr-2" />
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default PersonalBookshelfPage;
