// routes/adminRoutes.js
import express from "express";
import Admin from "../models/admin_model.js";

const router = express.Router();

// Create a new admin
router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists." });
    }

    const newAdmin = new Admin({ name, email, password, role });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully.", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin.", error });
  }
});

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins.", error });
  }
});

// Get a specific admin by ID
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin.", error });
  }
});

// Update an admin by ID
router.put("/:id", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res
      .status(200)
      .json({ message: "Admin updated successfully.", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin.", error });
  }
});

// Delete an admin by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    res.status(200).json({ message: "Admin deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin.", error });
  }
});

export default router;
