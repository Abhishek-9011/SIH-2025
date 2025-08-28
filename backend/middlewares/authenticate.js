import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]; // Bearer <token>

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach full user (minus password) to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user; // ✅ now authorize() can use req.user.role
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

export default userMiddleware;
