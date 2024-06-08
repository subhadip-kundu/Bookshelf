import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearchPage from './BookSearchPage';
import PersonalBookshelfPage from './PersonalBookshelfPage';

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<BookSearchPage />} />
          <Route path="/bookshelf" element={<PersonalBookshelfPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
