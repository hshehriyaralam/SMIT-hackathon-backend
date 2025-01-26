import express from "express";
import Loan from "../models/loans_model.js";

const router = express.Router();

// 1. Create a new loan
router.post("/loans", async (req, res) => {
  try {
    const {
      userId,
      category,
      subcategory,
      amount,
      initialDeposit,
      loanPeriod,
      status,
    } = req.body;

    const newLoan = new Loan({
      userId,
      category,
      subcategory,
      amount,
      initialDeposit,
      loanPeriod,
      status,
    });

    await newLoan.save();
    res
      .status(201)
      .json({ message: "Loan created successfully", data: newLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 2. Get all loans
router.get("/loans", async (req, res) => {
  try {
    const loans = await Loan.find().populate("userId", "name email"); // You can customize the fields you want to show from the User model.
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 3. Get a single loan by ID
router.get("/loans/:id", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate("userId");

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 4. Update a loan by ID
router.put("/loans/:id", async (req, res) => {
  try {
    const {
      category,
      subcategory,
      amount,
      initialDeposit,
      loanPeriod,
      status,
    } = req.body;

    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      {
        category,
        subcategory,
        amount,
        initialDeposit,
        loanPeriod,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res
      .status(200)
      .json({ message: "Loan updated successfully", data: updatedLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 5. Delete a loan by ID
router.delete("/loans/:id", async (req, res) => {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(req.params.id);

    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
