// general.js
// Implements the public book APIs using async/await + Axios + Promise callbacks.
// Used by the IBM Developing Back-End Apps with Node.js and Express final project.

const axios = require("axios");

const BASE = "https://giallybookreview-3985.nodejs.tutorialsplane.com";

// 1. Get all books using async/await with Axios
async function getAllBooks() {
  const url = `${BASE}/`;
  try {
    const response = await axios.get(url);
    console.log("All books retrieved:");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
    throw error;
  }
}

// 2. Search by ISBN using Promises
function getBooksByISBN(isbn) {
  const url = `${BASE}/isbn/${encodeURIComponent(isbn)}`;
  return axios
    .get(url)
    .then((response) => {
      console.log(`Books for ISBN ${isbn}:`);
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch((error) => {
      console.error(`Error fetching ISBN ${isbn}:`, error.message);
      throw error;
    });
}

// 3. Search by author using async/await with Axios
async function getBooksByAuthor(author) {
  const url = `${BASE}/author/${encodeURIComponent(author)}`;
  try {
    const response = await axios.get(url);
    console.log(`Books by author ${author}:`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error fetching author ${author}:`, error.message);
    throw error;
  }
}

// 4. Search by title using async/await with Axios
async function getBooksByTitle(title) {
  const url = `${BASE}/title/${encodeURIComponent(title)}`;
  try {
    const response = await axios.get(url);
    console.log(`Books with title ${title}:`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error fetching title ${title}:`, error.message);
    throw error;
  }
}

// 5. Get the book review (initial review) using async/await with Axios
async function getBookReview(isbn) {
  const url = `${BASE}/review/${encodeURIComponent(isbn)}`;
  try {
    const response = await axios.get(url);
    console.log(`Reviews for ISBN ${isbn}:`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error fetching review for ISBN ${isbn}:`, error.message);
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

// CLI runner
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
