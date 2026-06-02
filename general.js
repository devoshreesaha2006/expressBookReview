// general.js
// Routes for retrieving all books and looking them up by ISBN, author, or title.
// Uses async/await with Axios to call the public book APIs.

const axios = require("axios");

const BASE_BOOKS_URL = "https://giallybookreview-3985.nodejs.tutorialsplane.com/api/books";
const BASE_BOOKS_BY_ISBN_URL = (isbn) => `https://giallybookreview-3985.nodejs.tutorialsplane.com/api/isbn/${encodeURIComponent(isbn)}`;
const BASE_BOOKS_BY_AUTHOR_URL = (author) => `https://giallybookreview-3985.nodejs.tutorialsplane.com/api/author/${encodeURIComponent(author)}`;
const BASE_BOOKS_BY_TITLE_URL = (title) => `https://giallybookreview-3985.nodejs.tutorialsplane.com/api/title/${encodeURIComponent(title)}`;
const BASE_BOOK_REVIEW_URL = (isbn) => `https://giallybookreview-3985.nodejs.tutorialsplane.com/api/review/${encodeURIComponent(isbn)}`;

// Task 2: Retrieve a list of all available books
async function getAllBooks() {
  try {
    const response = await axios.get(BASE_BOOKS_URL);
    console.log("All books retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
    throw error;
  }
}

// Task 3: Search for books by ISBN
async function getBooksByISBN(isbn) {
  try {
    const response = await axios.get(BASE_BOOKS_BY_ISBN_URL(isbn));
    console.log(`Books for ISBN ${isbn}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
    throw error;
  }
}

// Task 4: Search for books by author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(BASE_BOOKS_BY_AUTHOR_URL(author));
    console.log(`Books by author ${author}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books for author ${author}:`, error.message);
    throw error;
  }
}

// Task 5: Search for books by title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(BASE_BOOKS_BY_TITLE_URL(title));
    console.log(`Books with title ${title}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books with title ${title}:`, error.message);
    throw error;
  }
}

// Task 6: Access reviews for a specific book by ISBN
async function getBookReview(isbn) {
  try {
    const response = await axios.get(BASE_BOOK_REVIEW_URL(isbn));
    console.log(`Reviews for ISBN ${isbn}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for ISBN ${isbn}:`, error.message);
    throw error;
  }
}

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
};

// Optional CLI runner
if (require.main === module) {
  (async () => {
    const [, , cmd, arg] = process.argv;
    switch (cmd) {
      case "all":
        await getAllBooks();
        break;
      case "isbn":
        await getBooksByISBN(arg);
        break;
      case "author":
        await getBooksByAuthor(arg);
        break;
      case "title":
        await getBooksByTitle(arg);
        break;
      case "review":
        await getBookReview(arg);
        break;
      default:
        console.log("Usage: node general.js [all|isbn <isbn>|author <author>|title <title>|review <isbn>]");
    }
  })();
}
