import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"; // install with npm i bcryptjs
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, language, address, doctorInfo } =
      req.body;

    // check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      language,
      address,
      doctorInfo,
    });

    const userWithoutPassword = { ...newUser._doc };
    delete userWithoutPassword.password;

    return res.status(201).json({
      success: true,
      message: "User signup successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // store in .env
      { expiresIn: "1d" } // 1 day expiry
    );

    // remove password before sending response
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      token, // frontend will store this in localStorage/sessionStorage
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Signin error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
