import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import bookModel from "../models/bookModel.js";

class OrderController {
  async placeOrder(req, res) {
    try {
      const { id } = req.headers;
      const { order } = req.body;

      for (const orderData of order) {
        // console.log(orderData);
        const newOrder = new orderModel({ user: id, book: orderData._id });
        const orderDataFromDb = await newOrder.save();

        // Add order ID to user's orders array
        await userModel.findByIdAndUpdate(id, {
          $push: { orders: orderDataFromDb._id },
        });

        // Remove book from user's cart
        await userModel.findByIdAndUpdate(id, {
          $pull: { cart: orderData._id },
        });

        // await bookModel.findByIdAndUpdate(orderData._id, {
        //   $inc: { sales: 1 }, // Increment the sales count by 1
        // });
      }

      return res.json({
        status: "Success",
        message: "Order Placed Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error ocurred.",
      });
    }
  }

  async getOrderHistoryOfUser(req, res) {
    try {
      const { id } = req.headers;
      const userData = await userModel.findById(id).populate({
        path: "orders",
        populate: { path: "book" },
      });

      const ordersData = userData.orders.reverse();

      return res.json({
        status: "Success",
        data: ordersData,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "An error ocurred.",
      });
    }
  }

  async getAllOrders(req, res) {
    try {
      const userData = await orderModel
        .find()
        .populate({
          path: "book",
        })
        .populate({
          path: "user",
        })
        .sort({ createdAt: -1 });
      return res.json({
        status: "Success",
        data: userData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error ocurred.",
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;

      await orderModel.findByIdAndUpdate(id, { status: req.body.status });
      return res.json({
        status: "Success",
        message: "Status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error ocurred.",
      });
    }
  }
}

export default OrderController;
