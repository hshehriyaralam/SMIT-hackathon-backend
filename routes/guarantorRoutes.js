import express from "express";
import Guarantor from "../models/guarantor_model.js";

const router = express.Router();

// 1. Create a new guarantor
router.post("/guarantors", async (req, res) => {
  try {
    const { loanId, name, email, cnic, location } = req.body;

    const newGuarantor = new Guarantor({
      loanId,
      name,
      email,
      cnic,
      location,
    });

    await newGuarantor.save();
    res
      .status(201)
      .json({ message: "Guarantor created successfully", data: newGuarantor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 2. Get all guarantors
router.get("/guarantors", async (req, res) => {
  try {
    const guarantors = await Guarantor.find().populate(
      "loanId",
      "amount status"
    ); // You can customize the fields you want to show from the Loan model.
    res.status(200).json(guarantors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 3. Get a single guarantor by ID
router.get("/guarantors/:id", async (req, res) => {
  try {
    const guarantor = await Guarantor.findById(req.params.id).populate(
      "loanId"
    );

    if (!guarantor) {
      return res.status(404).json({ message: "Guarantor not found" });
    }

    res.status(200).json(guarantor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 4. Update a guarantor by ID
router.put("/guarantors/:id", async (req, res) => {
  try {
    const { loanId, name, email, cnic, location } = req.body;

    const updatedGuarantor = await Guarantor.findByIdAndUpdate(
      req.params.id,
      { loanId, name, email, cnic, location, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedGuarantor) {
      return res.status(404).json({ message: "Guarantor not found" });
    }

    res.status(200).json({
      message: "Guarantor updated successfully",
      data: updatedGuarantor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 5. Delete a guarantor by ID
router.delete("/guarantors/:id", async (req, res) => {
  try {
    const deletedGuarantor = await Guarantor.findByIdAndDelete(req.params.id);

    if (!deletedGuarantor) {
      return res.status(404).json({ message: "Guarantor not found" });
    }

    res.status(200).json({ message: "Guarantor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
