import { MedicalRecord } from "../models/medicalRecord.model.js";

// ✅ Create a new medical record
export const createMedicalRecord = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      recordType,
      description,
      prescriptions,
      attachments,
      vitalSigns,
      notes,
    } = req.body;

    const record = new MedicalRecord({
      patient,
      doctor,
      recordType,
      description,
      prescriptions,
      attachments,
      vitalSigns,
      notes,
    });

    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecordsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await MedicalRecord.find({ patient: patientId })
      .populate("patient", "name email")
      .populate("doctor", "name email role")
      .populate("prescriptions", "medicines createdAt");

    if (!records.length) {
      return res
        .status(404)
        .json({ success: false, message: "No records found for this patient" });
    }

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all medical records by doctor
export const getRecordsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const records = await MedicalRecord.find({ doctor: doctorId })
      .populate("patient", "name email")
      .populate("doctor", "name email role")
      .populate("prescriptions", "medicines createdAt");

    if (!records.length) {
      return res
        .status(404)
        .json({ success: false, message: "No records found for this doctor" });
    }

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("patient", "name email")
      .populate("doctor", "name email role")
      .populate("prescriptions", "medicines createdAt"); // optional fields to show in prescriptions

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single medical record by ID
export const getMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate("patient", "name email")
      .populate("doctor", "name email role")
      .populate("prescriptions", "medicines createdAt");

    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Medical record not found" });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update a medical record
export const updateMedicalRecord = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date(); // always update timestamp

    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    )
      .populate("patient", "name email")
      .populate("doctor", "name email role")
      .populate("prescriptions", "medicines createdAt");

    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Medical record not found" });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a medical record
export const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Medical record not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Medical record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
