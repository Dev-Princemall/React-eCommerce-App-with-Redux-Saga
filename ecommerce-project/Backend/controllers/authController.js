import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc   Register new user
// @route  POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = await User.create({ email, password });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        _id: user._id,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        _id: user._id,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get user profile
// @route  GET /api/auth/profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, role, fullName, phoneNumber, ...addressFields } =
      req.body;

    const updates = {
      ...(fullName && { fullName }),
      ...(phoneNumber && { phoneNumber }),
      address: {
        ...user.address.toObject(),
        ...addressFields,
      },
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
