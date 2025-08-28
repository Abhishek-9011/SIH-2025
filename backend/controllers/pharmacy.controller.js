import { Pharmacy } from "../models/pharmacy.model.js";

// ✅ Create Pharmacy
export const createPharmacy = async (req, res) => {
  try {
    const { name, owner, address, phone, medicines } = req.body;

    if (!name || !owner || !address?.city) {
      return res.status(400).json({
        success: false,
        message: "Name, owner, and city are required",
      });
    }

    const pharmacy = await Pharmacy.create({
      name,
      owner,
      address,
      phone,
      medicines,
    });

    res.status(201).json({
      success: true,
      message: "Pharmacy created successfully",
      pharmacy,
    });
  } catch (error) {
    console.error("Create Pharmacy Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get All Pharmacies
export const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find()
      .populate("owner", "name email role")
      .populate("medicines", "name price stock");
    res.status(200).json({ success: true, pharmacies });
  } catch (error) {
    console.error("Get Pharmacies Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get Pharmacy by ID
export const getPharmacyById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const pharmacy = await Pharmacy.findOne({ owner: id })
      .populate("owner", "name email role")
      .populate("medicines", "name price stock");

    console.log(pharmacy);

    if (!pharmacy) {
      return res
        .status(404)
        .json({ success: false, message: "Pharmacy not found" });
    }

    res.status(200).json({ success: true, pharmacy });
  } catch (error) {
    console.error("Get Pharmacy Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update Pharmacy
export const updatePharmacy = async (req, res) => {
  try {
    const { id } = req.params; // this is ownerId
    const updates = req.body;

    // Prevent updating sensitive fields
    delete updates._id;
    delete updates.owner;

    const pharmacy = await Pharmacy.findOneAndUpdate(
      { owner: id }, // ✅ find by owner instead of _id
      updates,
      { new: true, runValidators: true }
    )
      .populate("owner", "name email role")
      .populate("medicines", "name price stock");

    if (!pharmacy) {
      return res
        .status(404)
        .json({ success: false, message: "Pharmacy not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Pharmacy updated", pharmacy });
  } catch (error) {
    console.error("Update Pharmacy Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Delete Pharmacy
export const deletePharmacy = async (req, res) => {
  try {
    const { id } = req.params;

    const pharmacy = await Pharmacy.findByIdAndDelete(id);

    if (!pharmacy) {
      return res
        .status(404)
        .json({ success: false, message: "Pharmacy not found" });
    }

    res.status(200).json({ success: true, message: "Pharmacy deleted" });
  } catch (error) {
    console.error("Delete Pharmacy Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
