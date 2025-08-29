// components/ProblemManagement.jsx
"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ProblemForm from "./ProblemForm";
import axiosClient from "@/utils/axiosClient";

export default function ProblemManagement() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch problems from backend
  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/problems/getAllProblem");
      setProblems(res.data.reply || res.data);
    } catch (err) {
      console.error("Error fetching problems:", err);
      alert("Error fetching problems: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      const res = await axiosClient.delete(`/problems/delete/${id}`);
      if (res.status === 200) {
        alert("Problem deleted successfully");
        fetchProblems(); // Refresh the list
      }
    } catch (err) {
      console.error("Error deleting problem:", err);
      alert("Error deleting problem: " + (err.response?.data?.message || err.message));
    }
  };

  // Handle save (both create and update)
  const handleSave = () => {
    setShowForm(false);
    setEditingProblem(null);
    fetchProblems(); // Refresh the list
  };

  // Filtering
  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
    const matchesDifficulty = difficulty === "all" || p.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  if (showForm || editingProblem) {
    return (
      <ProblemForm
        problem={editingProblem}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingProblem(null);
        }}
        isEditing={!!editingProblem}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400">Problem Management</h1>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> New Problem
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#1b1f2a] border-gray-700"
            />
          </div>
          <Select onValueChange={setDifficulty} defaultValue="all">
            <SelectTrigger className="w-[180px] bg-[#1b1f2a] border-gray-700">
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problems Table */}
        {loading ? (
          <div className="text-center py-10">Loading problems...</div>
        ) : filteredProblems.length === 0 ? (
          <div className="text-center py-10">
            {problems.length === 0 ? "No problems found. Create your first problem!" : "No problems match your filters."}
          </div>
        ) : (
          <div className="bg-[#1b1f2a] border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Difficulty</th>
                  <th className="py-3 px-4 text-left">Tags</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem) => (
                  <tr key={problem.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                    <td className="py-3 px-4">{problem.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        problem.difficulty === "Easy" 
                          ? "bg-green-500/20 text-green-400" 
                          : problem.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags && problem.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProblem(problem)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(problem.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}