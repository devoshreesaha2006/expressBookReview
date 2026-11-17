// general.js
// IBM Developing Back-End Apps with Node.js and Express final project.
// Implements the four required public book API calls with axios.

const axios = require("axios");

const BASE_URL = "http://localhost:5000";

function isEmptyResult(data) {
  if (data == null) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === "object") return Object.keys(data).length === 0;
  return false;
}

// Task 10: Get all books using a callback function.
function getAllBooks(callback) {
  axios
    .get(`${BASE_URL}/`)
    .then((response) => {
      if (isEmptyResult(response.data)) {
        callback(new Error("No books found."), null);
        return;
      }
      callback(null, response.data);
    })
    .catch((error) => callback(error, null));
}

// Task 11: Search by ISBN using a Promise.
function getBookByISBN(isbn) {
  return axios
    .get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
    .then((response) => {
      if (isEmptyResult(response.data)) {
        throw new Error(`Book with ISBN ${isbn} not found.`);
      }
      return response.data;
    });
}

// Task 12: Search by author using async/await.
async function getBooksByAuthor(author) {
  const response = await axios.get(
    `${BASE_URL}/author/${encodeURIComponent(author)}`
  );
  if (isEmptyResult(response.data)) {
    return { message: `No books found for author: ${author}`, books: [] };
  }
  return response.data;
}

// Task 13: Search by title using async/await.
async function getBooksByTitle(title) {
  const response = await axios.get(
    `${BASE_URL}/title/${encodeURIComponent(title)}`
  );
  if (isEmptyResult(response.data)) {
    return { message: `No books found with title: ${title}`, books: [] };
  }
  return response.data;
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};

if (require.main === module) {
  getAllBooks((error, books) => {
    if (error) {
      console.error(error.message);
      return;
    }
    console.log("All books:");
    console.log(JSON.stringify(books, null, 2));
  });

  getBookByISBN("1")
    .then((book) => {
      console.log("Book by ISBN 1:");
      console.log(JSON.stringify(book, null, 2));
    })
    .catch((error) => console.error(error.message));

  getBooksByAuthor("Unknown")
    .then((books) => {
      console.log("Books by author Unknown:");
      console.log(JSON.stringify(books, null, 2));
    })
    .catch((error) => console.error(error.message));

  getBooksByTitle("Things Fall Apart")
    .then((books) => {
      console.log("Books by title Things Fall Apart:");
      console.log(JSON.stringify(books, null, 2));
    })
    .catch((error) => console.error(error.message));
}
