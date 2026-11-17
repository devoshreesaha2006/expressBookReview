const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("./booksdb");

const regdUsers = express.Router();
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || "access";

const isValid = (username) => users.some((user) => user.username === username);
const authenticatedUser = (username, password) =>
  users.some((user) => user.username === username && user.password === password);

regdUsers.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).json({ message: "Login successful", token });
});

regdUsers.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  const { review } = req.body || {};
  if (typeof review !== "string" || !review.trim()) {
    return res.status(400).json({ message: "Review text is required" });
  }
  book.reviews[req.username] = review.trim();
  return res.status(200).json({
    message: "Review added/updated successfully",
    reviews: book.reviews
  });
});

regdUsers.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (!Object.prototype.hasOwnProperty.call(book.reviews, req.username)) {
    return res.status(404).json({ message: "No review found for this user" });
  }
  delete book.reviews[req.username];
  return res.status(200).json({ message: "Review deleted successfully", reviews: book.reviews });
});

module.exports.authenticated = regdUsers;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;
module.exports.users = users;
