import { Prescription } from "../models/prescription.model.js";

// ✅ Create a new prescription
export const createPrescription = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      medicines,
      pharmacy,
      status,
      attachments,
      totalPrice,
      notes,
    } = req.body;

    const prescription = new Prescription({
      patient,
      doctor,
      medicines,
      pharmacy,
      status: status || "Pending",
      attachments: attachments || [],
      totalPrice: totalPrice || 0,
      notes: notes || "",
    });

    await prescription.save();

    const populatedPrescription = await prescription
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .populate("medicines.medicine", "name price")
      .populate("pharmacy", "name address");

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      prescription: populatedPrescription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .populate("medicines.medicine", "name price")
      .populate("pharmacy", "name address");

    res.status(200).json({ success: true, prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a prescription by ID
export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .populate("medicines.medicine", "name price")
      .populate("pharmacy", "name address");

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    res.status(200).json({ success: true, prescription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update a prescription
export const updatePrescription = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };

    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    )
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .populate("medicines.medicine", "name price")
      .populate("pharmacy", "name address");

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      prescription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a prescription
export const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    res.status(200).json({ success: true, message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get prescriptions by patient
export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await Prescription.find({ patient: patientId })
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .populate("medicines.medicine", "name price")
      .populate("pharmacy", "name address");

    res.status(200).json({ success: true, prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get prescriptions by doctor
export const getPrescriptionsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const prescriptions = await Prescription.find({ doctor: doctorId })
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .populate("medicines.medicine", "name price")
      .populate("pharmacy", "name address");

    res.status(200).json({ success: true, prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
