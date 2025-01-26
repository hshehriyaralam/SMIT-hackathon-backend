// guarantor_model.js
import bcrypt from "bcryptjs";

import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for the Guarantors collection
const guarantorSchema = new Schema({
  loanId: {
    type: Schema.Types.ObjectId,
    ref: "Loan",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  cnic: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
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
guarantorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Create the model
const Guarantor = mongoose.model("Guarantor", guarantorSchema);

export default Guarantor;
