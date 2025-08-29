import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Pharmacy } from "../models/pharmacy.model.js";
import { uploadMedia } from "../utils/cloudinary.js";
/**
 * ------------------------
 * PATIENT SIGNUP (direct)
 * ------------------------
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, language, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    // Only patients can self-register directly
    if (role && role !== "patient") {
      return res.status(403).json({
        success: false,
        message: "You cannot self-assign this role",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "patient",
      language,
      address,
      isVerified: true, // Patients are auto-verified
      status: "approved", // Patients don't need admin approval
    });

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    return res.status(201).json({
      success: true,
      message: "Patient signup successful",
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

/**
 * DOCTOR SIGNUP WITH CERTIFICATIONS
 */
export const doctorSignup = async (req, res) => {
  try {
    const { name, email, password, hospital, specialization, roles } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload certifications to Cloudinary
    let documents = [];
    if (req.files && req.files.certifications) {
      for (const file of req.files.certifications) {
        const result = await uploadMedia(file.buffer);
        documents.push(result.secure_url);
      }
    }

    const newDoctor = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      doctorInfo: { hospital, specialization, roles },
      documents, // <-- store URLs here
      status: "pending",
      isVerified: false,
    });

    await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor registered. Awaiting admin approval.",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * PHARMACY OWNER SIGNUP WITH CERTIFICATIONS
 */
export const pharmacySignup = async (req, res) => {
  try {
    const { name, pharmacyName, email, password, address, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload documents (certifications, licenses, etc.) to Cloudinary
    let documents = [];
    if (req.files && req.files.documents) {
      for (const file of req.files.documents) {
        const result = await uploadMedia(file.buffer);
        documents.push(result.secure_url);
      }
    }

    // Create pharmacyOwner user with uploaded documents
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "pharmacyOwner",
      status: "pending", // waiting for admin approval
      isVerified: false,
      documents, // store document URLs here
    });

    await newUser.save();

    // Create pharmacy entry linked to user
    const newPharmacy = new Pharmacy({
      name: pharmacyName,
      owner: newUser._id,
      address,
      phone,
      medicines: [],
    });

    await newPharmacy.save();

    res.status(201).json({
      success: true,
      message: "Pharmacy owner registered. Awaiting admin approval.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        documents: newUser.documents,
      },
      pharmacy: {
        id: newPharmacy._id,
        name: newPharmacy.name,
        phone: newPharmacy.phone,
      },
    });
  } catch (err) {
    console.error("Pharmacy signup error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * ------------------------
 * SIGNIN (common for all roles)l
 * ------------------------z
 */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check approval status for doctor & pharmacyOwner
    if (["doctor", "pharmacyOwner"].includes(user.role)) {
      if (user.status === "pending") {
        return res.status(403).json({
          success: false,
          message: "Your account is pending admin approval",
        });
      }
      if (user.status === "rejected") {
        return res.status(403).json({
          success: false,
          message: "Your account was rejected by admin",
        });
      }
    }

    // Admin can log in directly (pre-created in DB)
    // Patient can log in directly too

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
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
