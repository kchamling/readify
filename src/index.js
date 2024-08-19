import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import bookRoute from "./routes/bookRoute.js";
import favouritesRoute from "./routes/favouritesRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import orderModel from "./models/orderModel.js";
import userModel from "./models/userModel.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Backend is working");
});

app.use("/api/v1", userRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", favouritesRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", orderRoute);

app.listen(process.env.PORT || 8000, async () => {
  console.log("Server is running at ", process.env.PORT);

  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error during connection to DB", err);
  }
});

// const createOrder = async (userId, bookId) => {
//   try {
//     const newOrder = new orderModel({
//       user: new mongoose.Types.ObjectId(userId),
//       book: new mongoose.Types.ObjectId(bookId),
//       status: "Order placed",
//     });

//     const savedOrder = await newOrder.save();

//     await userModel.findByIdAndUpdate(userId, {
//       $push: { orders: savedOrder._id },
//     });

//     console.log("Order created successfully:", savedOrder);
//   } catch (error) {
//     console.error("Error creating order:", error);
//   }
// };

// createOrder("66b216995c4998d237dc5854", "66ae76ef00c8f8f4f237b807");
