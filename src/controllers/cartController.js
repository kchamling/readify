import userModel from "../models/userModel.js";

class CartController {
  async addToCart(req, res) {
    try {
      const { bookid, id } = req.headers;
      const userData = await userModel.findById(id);
      const isBookInCart = userData.cart.includes(bookid);

      if (isBookInCart) {
        return res.json({
          status: "Success",
          message: "Book is already in cart",
        });
      }

      await userModel.findByIdAndUpdate(id, { $push: { cart: bookid } });

      return res.json({
        status: "Success",
        message: "Book added to cart",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async removeFromCart(req, res) {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;

      // Find user and update cart
      const userData = await userModel.findById(id);
      if (!userData) {
        return res.status(404).json({ message: "User not found." });
      }

      const isBookInCart = userData.cart.includes(bookid);

      if (!isBookInCart) {
        return res.json({
          status: "Success",
          message: "Book was not in cart",
        });
      }

      await userModel.findByIdAndUpdate(id, {
        $pull: { cart: bookid },
      });

      return res.json({
        status: "Success",
        message: "Book removed from cart",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async getCartOfUser(req, res) {
    try {
      const { id } = req.headers;
      const userData = await userModel.findById(id).populate("cart");
      const cart = userData.cart.reverse();

      return res.json({ status: "Success", data: cart });
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

export default CartController;
