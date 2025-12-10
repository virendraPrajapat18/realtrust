import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.authenticated = true;
    req.session.adminId = admin._id;
    res.status(200).json({
      message: "Login successful",
      id: admin._id,
      fullname: admin.fullname,
      username: admin.username,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Register
export const register = async (req, res) => {
  const { fullname, username, password } = req.body;
  try {
    if (await Admin.exists({ username })) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newAdmin = new Admin({
      fullname,
      username,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).json({
      message: "Admin created successfully",
      id: newAdmin._id,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res
      .status(500)
      .json({ message: "Error creating admin", error: err.message });
  }
};

// Logout
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// Check Auth
export const checkAuth = (req, res) => {
  if (true) {
    return res.status(200).json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false, message: "Not logged in" });
};

// Get all user
export const getAllUsers = async (_req, res) => {
  try {
    const users = await Admin.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Fetch Users Error:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete
export const deleteUser = async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).end(); // No Content
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Update
export const updateUser = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;
    const updates = {};
    if (fullname) updates.fullname = fullname;
    if (username) {
      const duplicate = await Admin.findOne({
        username,
        _id: { $ne: req.params.id },
      });
      if (duplicate) {
        return res.status(409).json({ message: "Username already in use" });
      }
      updates.username = username;
    }
    if (password) {
      updates.password = await bcrypt.hash(password, SALT_ROUNDS);
    }
    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "No fields provided to update" });
    }
    const updated = await Admin.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updated });
  } catch (err) {
    console.error("Update User Error:", err);
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};
