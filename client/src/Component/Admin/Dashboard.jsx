import React, { useEffect, useState } from "react";
import { Users, FileText, BarChart3, Code } from "lucide-react";
import axiosClient from "@/utils/axiosClient";

const Dashboard = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const res = await axiosClient.get("users/admin/users");
        const totalUser=res.data.users.length;
        const blockedusers=res.data.users.filter((u)=>u.isBlocked===true).length;
        const activeuser=totalUser-blockedusers;

        setTotalUser(totalUser);
        setActiveUsers(activeuser)// assuming API returns array of users

        // Example: if you also have a problems API
        const problemRes = await axiosClient.get("problems/getAllProblem");
        console.log(problemRes.data);
        setTotalProblems(problemRes.data.reply.length);
        console.log(problemRes.data.reply.length);

      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-8">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                {totalUser}
              </p>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        {/* Total Problems */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Total Problems
              </p>
              <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                {totalProblems}
              </p>
            </div>
            <FileText className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Active Users
              </p>
              <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                {activeUsers}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        {/* Submissions Today */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Submissions Today
              </p>
              <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                2,456
              </p>
            </div>
            <Code className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
