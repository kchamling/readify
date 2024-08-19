import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import BookController from "../controllers/bookController.js";

const router = Router();
const bookController = new BookController();

// Add Book - admin
router.post("/add-book", validateToken, checkAdmin, bookController.addBook);

// Update Book - admin
router.put(
  "/update-book",
  validateToken,
  checkAdmin,
  bookController.updateBook
);

// Delete Book - admin
router.delete(
  "/delete-book",
  validateToken,
  checkAdmin,
  bookController.deleteBook
);

// Get All Books
router.get("/get-all-books", bookController.getAllBooks);

// Get Recently Added Books limit 8
router.get("/get-recent-books", bookController.getRecentlyAddedBooks);

// Get Book By Id
router.get("/get-book-by-id/:id", bookController.getBookById);

// Search book by query
router.get("/search-book-all", bookController.searchBook);

// Get book by genre
router.get("/get-books-by-genre", bookController.getBooksByGenre);

// Get all genres
router.get("/get-all-genres", bookController.getAllGenres);

// router.get("/get-top-seller-books", bookController.getTopSellerBooks);

export default router;
