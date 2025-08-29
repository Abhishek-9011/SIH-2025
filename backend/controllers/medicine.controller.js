// controllers/medicineController.js
import { Medicine } from "../models/medicine.model.js";
import { Pharmacy } from "../models/pharmacy.model.js";

// Create a new medicine
export const createMedicine = async (req, res) => {
  try {
    const { name, manufacturer, price, stock, pharmacy, image, expiry } = req.body;

    // Check if pharmacy exists
    const existingPharmacy = await Pharmacy.findById(pharmacy);
    if (!existingPharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    // Create medicine
    const medicine = new Medicine({ name, manufacturer, price, stock, pharmacy, image, expiry });
    await medicine.save();

    // Add medicine ID to pharmacy's medicines array
    existingPharmacy.medicines.push(medicine._id);
    await existingPharmacy.save();

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Error creating medicine", error: error.message });
  }
};

// Get all medicines
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate("pharmacy", "name address phone");
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medicines", error: error.message });
  }
};

// Get single medicine by ID
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate("pharmacy", "name address");
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medicine", error: error.message });
  }
};

// Update medicine
export const updateMedicine = async (req, res) => {
  try {
    const { name, manufacturer, price, stock, image, expiry } = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, manufacturer, price, stock, image, expiry },
      { new: true }
    );

    if (!updatedMedicine) return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: "Error updating medicine", error: error.message });
  }
};

// Delete medicine
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    // Remove medicine from pharmacy's medicines array
    await Pharmacy.findByIdAndUpdate(medicine.pharmacy, {
      $pull: { medicines: medicine._id },
    });

    await Medicine.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting medicine", error: error.message });
  }
};
