import userModel from "../models/userModel.js";

const checkAdmin = async (req, res, next) => {
  const { id } = req.headers;
  try {
    const user = await userModel.findById(id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You do not have access to perform admin work" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default checkAdmin;
