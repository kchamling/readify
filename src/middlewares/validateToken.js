import jwt from "jsonwebtoken";
import "dotenv/config";

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const isValid = jwt.verify(token, process.env.JWT_SECRET);
      if (isValid) next();
      else res.status(403).json({ success: false, message: "Invalid Token" });
    } catch (error) {
      console.log(error);
      return res.status(403).json(error);
    }
  } else {
    return res.status(403).json("Token not provided.");
  }
};

export default validateToken;
