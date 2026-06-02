// general.js
// IBM Developing Back-End Apps with Node.js and Express final project.
// Implements the four required public book API calls with axios.

const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books using an async callback function.
function getAllBooks(callback) {
  axios
    .get(`${BASE_URL}/`)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
}

// Task 11: Search by ISBN using Promises.
function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/isbn/${isbn}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Task 12: Search by author using async/await.
async function getBooksByAuthor(author) {
  const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
  return response.data;
}

// Task 13: Search by title using async/await.
async function getBooksByTitle(title) {
  const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
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
