import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Ban } from "lucide-react";
import axiosClient from "@/utils/axiosClient";

export default function UsersDetails() {
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosClient.get("users/admin/users");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Toggle block/unblock
 const handleToggleBlock = async (userId) => {
  try {
    const res = await axiosClient.patch(`/users/admin/block/${userId}`);
    

    // Update UI immediately after toggle
    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
      )
    );
  } catch (err) {
    console.error("Error toggling user status:", err.message);
  }
};

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosClient.delete(`users/admin/delete/${userId}`);

      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">
          User Management
        </h2>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-emerald-200 dark:border-emerald-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50 dark:bg-emerald-900/30">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Problems Solved</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-200 dark:divide-emerald-800">
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20"
                >
                  {/* User Info */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium">{u.firstName}</div>
                      <div className="text-sm text-emerald-600">{u.emailId}</div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        u.role === "admin"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        u.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Problems solved */}
                  <td className="px-6 py-4">{u.problemsSolved || 0}</td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                     {u.role==="admin"?null: <button
                        onClick={() => handleToggleBlock(u._id, u.isBlocked)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                          u.isBlocked
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        <Ban className="w-4 h-4" />
                        {(u.isBlocked ? "Unblock" : "Block")}
                      </button>}

                      {u.role==="admin"?null:<button
                        onClick={() => handleDeleteUser(u._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        {<Trash2 className="w-4 h-4" />}
                      </button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
