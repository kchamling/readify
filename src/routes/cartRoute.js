import { Router } from "express";
import userModel from "../models/userModel.js";
import validateToken from "../middlewares/validateToken.js";
import CartController from "../controllers/cartController.js";


const router = Router();
const cartController = new CartController()

// Add Book To Cart
router.put("/add-to-cart", validateToken, cartController.addToCart);

// Remove Book From Cart
router.put("/remove-from-cart/:bookid", validateToken, cartController.removeFromCart);

// Get Cart Of A Particular User
router.get("/get-user-cart", validateToken, cartController.getCartOfUser);

export default router;
