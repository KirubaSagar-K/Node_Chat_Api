import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ error: "Unauthorized. no token provided" });
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded)
      return res.status(401).json({ error: "Invalid token provided" });
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoutes fn:", error.message);
    res.status(500).json("Internal server error");
  }
};
