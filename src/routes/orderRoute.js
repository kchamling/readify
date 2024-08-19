import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import OrderController from "../controllers/orderController.js";

const router = Router();
const orderController = new OrderController();

// Place Order
router.post("/place-order", validateToken, orderController.placeOrder);

// Get Order History Of A User
router.get(
  "/get-order-history",
  validateToken,
  orderController.getOrderHistoryOfUser
);

// Get All Orders -- admin
router.get(
  "/get-all-orders",
  validateToken,
  checkAdmin,
  orderController.getAllOrders
);

// Update Status -- admin
router.put(
  "/update-status/:id",
  validateToken,
  checkAdmin,
  orderController.updateStatus
);


export default router;
