import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PersonalBookshelfPage() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const removeFromBookshelf = (bookKey) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookKey);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Bookshelf</h1>
        <Link to="/" className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
          Go Back to Home
        </Link>
      </div>
      {bookshelf.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Your bookshelf is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookshelf.map(book => (
            <div key={`${Math.random()}`}  className="border border-gray-400 rounded p-4 shadow-md">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p>{book.author_name && book.author_name.join(', ')}</p>
              <button
                onClick={() => removeFromBookshelf(book.key)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonalBookshelfPage;
