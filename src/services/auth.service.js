import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, userName, password, email, gender } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      return { message: "User already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyPic = `https://avatar-placeholder.iran.liara.run/avatars/male?username=${userName}`;
    const girlPic = `https://avatar-placeholder.iran.liara.run/avatars/female?username=${userName}`;
    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "Male" ? boyPic : girlPic,
    });
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({ _id: newUser._id });
  } catch (error) {
    console.error("Error in signup fn:", error.message);
    res.status(500).json("Internal server error");
  }
};

export const logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ _id: user._id });
  } catch (error) {
    console.error("Error in login fn:", error.message);
    res.status(500).json("Internal server error");
  }
};

export const logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout fn:", error.message);
    res.status(500).json("Internal server error");
  }
};
