import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserController {
  async signUp(req, res) {
    try {
      const { username, email, password, address } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        username: username,
        email: email,
        password: hashPassword,
        address: address,
      });

      await newUser.save();
      return res.status(200).json({ message: "SignUp Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async signIn(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const existingUser = await userModel.findOne({ username: username });

      if (!existingUser) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const authClaims = {
          username: existingUser.username,
          role: existingUser.role,
        };

        const token = jwt.sign(authClaims, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        return res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserInfo(req, res) {
    try {
      const { id } = req.headers;
      const data = await userModel.findById(id).select("-password");
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUserDetails(req, res) {
    try {
      const { id } = req.headers;
      const { username, address } = req.body;
      await userModel.findByIdAndUpdate(id, {
        username: username,
        address: address,
      });
      return res
        .status(200)
        .json({ message: "User details Update Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
