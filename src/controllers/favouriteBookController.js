import userModel from "../models/userModel.js";

class FavouriteBookController {
  async addBookToFavourite(req, res) {
    try {
      const { bookid, id } = req.headers;
      const userData = await userModel.findById(id);
      const isBookFavourite = userData.favourites.includes(bookid);

      if (isBookFavourite) {
        return res
          .status(200)
          .json({ message: "Book is already in favourites" });
      }
      await userModel.findByIdAndUpdate(id, { $push: { favourites: bookid } });
      return res.status(200).json({ message: "Book added in favourites" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async removeBookFromFavourite(req, res) {
    try {
      const { bookid, id } = req.headers;
      const userData = await userModel.findById(id);
      const isBookFavourite = userData.favourites.includes(bookid);

      if (isBookFavourite) {
        await userModel.findByIdAndUpdate(id, {
          $pull: { favourites: bookid },
        });
      }
      return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async getFavouriteBookOfUser(req, res) {
    try {
      const { id } = req.headers;
      const userData = await userModel.findById(id).populate("favourites");
      const favouriteBooks = userData.favourites;

      return res.json({ status: "Success", data: favouriteBooks });
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

export default FavouriteBookController;
