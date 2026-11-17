const express = require("express");
const books = require("./booksdb");
const { isValid, users } = require("./auth_users");

const publicUsers = express.Router();

publicUsers.post("/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered. Now you can login." });
});

publicUsers.get("/", (req, res) => res.status(200).json(books));

publicUsers.get("/isbn/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.status(200).json({ [req.params.isbn]: book });
});

publicUsers.get("/author/:author", (req, res) => {
  const author = decodeURIComponent(req.params.author).toLowerCase();
  const matches = Object.fromEntries(
    Object.entries(books).filter(([, book]) => book.author.toLowerCase() === author)
  );
  if (!Object.keys(matches).length) return res.status(404).json({ message: "No books found for this author" });
  return res.status(200).json(matches);
});

publicUsers.get("/title/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title).toLowerCase();
  const matches = Object.fromEntries(
    Object.entries(books).filter(([, book]) => book.title.toLowerCase() === title)
  );
  if (!Object.keys(matches).length) return res.status(404).json({ message: "No books found with this title" });
  return res.status(200).json(matches);
});

publicUsers.get("/review/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.status(200).json(book.reviews);
});

module.exports.general = publicUsers;
