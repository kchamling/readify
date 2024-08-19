import { Router } from "express";
import userModel from "../models/userModel.js";
import validateToken from "../middlewares/validateToken.js";
import FavouriteBookController from "../controllers/favouriteBookController.js";

const router = Router();
const favouriteBookController = new FavouriteBookController()

// Add Book To Favourites
router.put("/add-book-to-favourite", validateToken, favouriteBookController. addBookToFavourite);

// Remove Book From Favourites
router.put("/remove-book-from-favourite", validateToken, favouriteBookController.removeBookFromFavourite);

// Get Favourite Books Of A Particular User
router.get("/get-favourite-books", validateToken, favouriteBookController.getFavouriteBookOfUser);

export default router;
