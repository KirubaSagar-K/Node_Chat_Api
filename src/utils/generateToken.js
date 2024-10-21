import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "15d",
    });
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV !== "developement",
    });
  } catch (error) {
    console.error("Error generating token:", error.message);
  }
};
