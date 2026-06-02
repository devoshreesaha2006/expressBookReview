# expressBookReview

**Project name: expressBookReview** — final project for IBM *Developing Back-End Apps with Node.js and Express*.

Forked from `ibm-developer-skills-network/expressBookReview` and extended with async/await + Axios implementations
of all the public book APIs (list all, ISBN, author, title, reviews).

## Tasks

1. `getAllBooks()` — list every book in the catalog.
2. `getBooksByISBN(isbn)` — look up a book by ISBN.
3. `getBooksByAuthor(author)` — look up books by author.
4. `getBooksByTitle(title)` — look up books by title.
5. `getBookReview(isbn)` — fetch the initial review for a book.

## Run

```
npm install axios
node general.js all
node general.js isbn 978-1-2345-6789-0
node general.js author "Jane Doe"
node general.js title "Node.js in Action"
node general.js review 978-1-2345-6789-0
```
