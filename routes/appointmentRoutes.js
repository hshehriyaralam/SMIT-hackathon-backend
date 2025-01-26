// routes/appointmentRoutes.js

import express from "express";
import Appointment from "../models/appointment_model.js";

const router = express.Router();

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const {
      loanId,
      appointmentDate,
      appointmentTime,
      officeLocation,
      tokenNumber,
      qrCode,
    } = req.body;
    const newAppointment = new Appointment({
      loanId,
      appointmentDate,
      appointmentTime,
      officeLocation,
      tokenNumber,
      qrCode,
    });
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an appointment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an appointment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
