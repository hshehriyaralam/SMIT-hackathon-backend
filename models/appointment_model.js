// appointment_model.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

// Define the schema for the Appointments collection
const appointmentSchema = new Schema({
  loanId: {
    type: Schema.Types.ObjectId,
    ref: "Loan",
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
    trim: true,
  },
  officeLocation: {
    type: String,
    required: true,
    trim: true,
  },
  tokenNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  qrCode: {
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
appointmentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Create the model
const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
