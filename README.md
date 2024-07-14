This is a React application that allows users to search for books using the OpenLibrary API and manage their personal bookshelf. The application consists of two main pages: BookSearchPage and PersonalBookshelfPage.

## Features

- **Book Search**: Users can search for books by entering a query in the search input field. The application fetches book data from the OpenLibrary API and displays the results in a grid layout.
- **Add to Bookshelf**: Users can add books to their personal bookshelf with a click of a button. The bookshelf data is stored in the browser's local storage.
- **Remove from Bookshelf**: Users can remove books from their personal bookshelf by clicking a remove button next to each book.Also deleted from browser's local storage.
- **Navigation**: Users can navigate between the book search page and the personal bookshelf page using links or buttons.

## Installation

1. Clone the repository:
`git clone https://github.com/subhadip-kundu/Bookshelf.git`

2. Navigate to the project directory:
`cd book-search-bookshelf`

3. Install the dependencies:
`npm install`

## Usage

1. Start the development server:
`npm run dev`

3. Open your browser and navigate to `http://localhost:5173`.

## Dependencies

- React
- React Router
- Axios
- React Icons
- React Spinners

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
