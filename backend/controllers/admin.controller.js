import { User } from "../models/user.model.js";

// ✅ Get all pending requests (only doctors & pharmacy owners)
export const getPendingRequests = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      role: { $in: ["doctor", "pharmacyOwner"] },
      status: "pending",
    });

    res.status(200).json({
      success: true,
      count: pendingUsers.length,
      data: pendingUsers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Approve or Reject a user request
// ✅ Approve or Reject a user request
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // approved / rejected

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use 'approved' or 'rejected'.",
      });
    }

    const updateFields = {
      status,
      isVerified: status === "approved" ? true : false,
    };

    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User has been ${status}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
