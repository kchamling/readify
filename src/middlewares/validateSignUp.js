import userModel from "../models/userModel.js";

export const validateRequiredFields = (req, res, next) => {
  const { username, email, password, address } = req.body;

  if (!username || !email || !password || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  next();
};

export const validateUsernameLength = (req, res, next) => {
  const { username } = req.body;

  if (username.length < 4) {
    return res
      .status(400)
      .json({ message: "Username length should be greater than 4" });
  }

  next();
};

export const validateEmailFormat = (req, res, next) => {
  const { email } = req.body;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!re.test(String(email).toLowerCase())) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  next();
};

export const validateAddress = (req, res, next) => {
  const { address } = req.body;

  if (!address || address.length <= 5) {
    return res
      .status(400)
      .json({ message: "Address should be greater than 5" });
  }

  next();
};

export const validatePasswordLength = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: "Password length should be greater than 5" });
  }

  next();
};

export const checkExistingUsername = async (req, res, next) => {
  const { username } = req.body;

  const existingUsername = await userModel.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  next();
};

export const checkExistingEmail = async (req, res, next) => {
  const { email } = req.body;

  const existingEmail = await userModel.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  next();
};
