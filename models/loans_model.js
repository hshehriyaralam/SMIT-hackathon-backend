// loans_model.js
import bcrypt from "bcryptjs";

import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for the Loans collection
const loanSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subcategory: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  initialDeposit: {
    type: Number,
    required: true,
    min: 0,
  },
  loanPeriod: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before each save operation
loanSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create the model
const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
