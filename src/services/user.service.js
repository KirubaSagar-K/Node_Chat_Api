import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const usersList = await User.find({ _id: { $ne: currentUser } }).select(
      "-password"
    );
    res.status(201).json(usersList);
  } catch (error) {
    console.error("Error in getUser:", error.message);
    res.status(500).json("Internal server error");
  }
};
