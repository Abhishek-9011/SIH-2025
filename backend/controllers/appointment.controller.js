// controllers/appointmentController.js
import { Appointment } from "../models/appointment.model.js";

// ✅ Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, hospital, date, status, reason } = req.body;

    const appointment = new Appointment({
      patient,
      doctor,
      hospital,
      date,
      status,
      reason,
    });

    await appointment.save();
    res.status(201).json({ success: true, message: "Appointment created successfully", appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating appointment", error: error.message });
  }
};

// ✅ Get All Appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization")
      .populate("hospital", "name address");

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching appointments", error: error.message });
  }
};

// ✅ Get Single Appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email")
      .populate("doctor", "name specialization")
      .populate("hospital", "name address");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching appointment", error: error.message });
  }
};

// ✅ Update Appointment
export const updateAppointment = async (req, res) => {
  try {
    const { patient, doctor, hospital, date, status, reason } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { patient, doctor, hospital, date, status, reason },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating appointment", error: error.message });
  }
};

// ✅ Delete Appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting appointment", error: error.message });
  }
};
