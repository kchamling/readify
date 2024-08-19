import bookModel from "../models/bookModel.js";

class BookController {
  async addBook(req, res) {
    const { url, title, author, price, desc, language, genre } = req.body;

    if (!url || !title || !author || !price || !desc || !language || !genre) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const book = new bookModel({
        url,
        title,
        author,
        price,
        desc,
        language,
        genre,
      });
      await book.save();
      return res.status(200).json({ message: "Book Added Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateBook(req, res) {
    const { bookid } = req.headers;
    const { url, title, author, price, desc, language, genre } = req.body;

    if (!bookid || !url || !title || !author || !price || !desc || !language) {
      return res
        .status(400)
        .json({ message: "Book ID and all fields are required" });
    }

    try {
      const book = await bookModel.findByIdAndUpdate(bookid, {
        url,
        title,
        author,
        price,
        desc,
        language,
        genre,
      });

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book Updated Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteBook(req, res) {
    const { bookid } = req.body;

    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    try {
      const book = await bookModel.findByIdAndDelete(bookid);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // async getAllBooks(req, res) {
  //   try {
  //     const books = await bookModel.find().sort({ createdAt: -1 });
  //     return res.json({ status: "Success", data: books });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  // }

  async getAllBooks(req, res) {
    try {
      // Get page and limit from query parameters, with default values
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

      // Calculate the number of items to skip
      const skip = (page - 1) * limit;

      // Fetch paginated books and total count
      const books = await bookModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalBooks = await bookModel.countDocuments();

      // Return paginated response
      return res.json({
        status: "Success",
        data: books,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks: totalBooks,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getRecentlyAddedBooks(req, res) {
    try {
      const books = await bookModel.find().sort({ createdAt: -1 }).limit(8);
      return res.json({ status: "Success", data: books });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await bookModel.findById(id);
      return res.json({ status: "Success", data: book });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // async getTopSellerBooks(req, res) {
  //   try {
  //     const topSellerBooks = await bookModel
  //       .find({})
  //       .sort({ sales: -1 })
  //       .limit(10); // Example: sorting by sales and limiting to 10
  //     res.status(200).json(topSellerBooks);
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ message: "Failed to get top-seller books", error });
  //   }
  // }

  async searchBook(req, res) {
    const { q } = req.query;

    if (q) {
      try {
        const data = await bookModel.find({
          $or: [
            { title: { $regex: q, $options: "i" } },
            { author: { $regex: q, $options: "i" } },
          ],
        });

        console.log(data);
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
      }
    } else {
      res.json({ success: false, message: "Empty Query Search string." });
    }
  }

  async getBooksByGenre(req, res) {
    try {
      const { genre } = req.query;

      if (!genre) {
        return res.status(400).json({ message: "Genre is required" });
      }

      const books = await bookModel.find({ genre }).sort({ createdAt: -1 });

      return res.json({ status: "Success", data: books });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllGenres(req, res) {
    try {
      const genres = await bookModel.distinct("genre");

      return res.json({ status: "Success", data: genres });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default BookController;
