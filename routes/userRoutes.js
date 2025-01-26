import express from "express";
import User from "../models/user_model.js";

const router = express.Router();

// 1. Create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, cnic, password, phone, address } = req.body;

    const newUser = new User({
      name,
      email,
      cnic,
      password,
      phone,
      address,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 2. Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 3. Get a single user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 4. Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, cnic, password, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, cnic, password, phone, address, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 5. Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
