// components/ProblemForm.jsx
"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Eye, TestTube, Code, HelpCircle, X } from "lucide-react";
import axiosClient from "@/utils/axiosClient";

// Zod schema with explanation field
const problemSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.string().min(1, "At least one tag is required"),
  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input cannot be empty"),
        output: z.string().min(1, "Output cannot be empty"),
        explanation: z.string().min(1, "Explanation is required"),
      })
    )
    .min(1, "At least one visible test case is required"),
  hiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input cannot be empty"),
        output: z.string().min(1, "Output cannot be empty"),
        explanation: z.string().min(1, "Explanation is required"),
      })
    )
    .min(1, "At least one hidden test case is required"),
  startCode: z
    .array(
      z.object({
        language: z.string().min(1),
        initialCode: z.string().min(1),
      })
    )
    .min(1, "At least one starter code is required"),
  referenceSolution: z
    .array(
      z.object({
        language: z.string().min(1),
        initialCode: z.string().min(1, "Complete code required"),
      })
    )
    .min(1, "At least one reference solution is required"),
});

export default function ProblemForm({ problem, onSave, onCancel, isEditing = false }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Easy",
      tags: "",
      visibleTestCases: [{ input: "", output: "", explanation: "" }],
      hiddenTestCases: [{ input: "", output: "", explanation: "" }],
      startCode: [{ language: "javascript", initialCode: "" }],
      referenceSolution: [{ language: "javascript", initialCode: "" }],
    },
  });

  const { fields: visibleFields, append: addVisible, remove: removeVisible } =
    useFieldArray({ control, name: "visibleTestCases" });
  const { fields: hiddenFields, append: addHidden, remove: removeHidden } =
    useFieldArray({ control, name: "hiddenTestCases" });
  const {
    fields: startCodeFields,
    append: addStartCode,
    remove: removeStartCode,
  } = useFieldArray({ control, name: "startCode" });
  const {
    fields: referenceFields,
    append: addReference,
    remove: removeReference,
  } = useFieldArray({ control, name: "referenceSolution" });

  // Load problem data when editing
  useEffect(() => {
    if (problem && isEditing) {
      reset({
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        tags: problem.tags.join(", "),
        visibleTestCases: problem.visibleTestCases || [{ input: "", output: "", explanation: "" }],
        hiddenTestCases: problem.hiddenTestCases || [{ input: "", output: "", explanation: "" }],
        startCode: problem.startCode || [{ language: "javascript", initialCode: "" }],
        referenceSolution: problem.referenceSolution || [{ language: "javascript", initialCode: "" }],
      });
    }
  }, [problem, isEditing, reset]);

  // Format inputs/outputs for Judge0
  const formatIO = (str) =>
    str
      .replace(/\[|\]|,/g, " ")
      .replace(/\\n/g, "\n")
      .trim();

  const onSubmit = async (data) => {
    const formatData = {
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      visibleTestCases: data.visibleTestCases.map((tc) => ({
        input: formatIO(tc.input),
        output: formatIO(tc.output),
        explanation: tc.explanation,
      })),
      hiddenTestCases: data.hiddenTestCases.map((tc) => ({
        input: formatIO(tc.input),
        output: formatIO(tc.output),
        explanation: tc.explanation,
      })),
      startCode: data.startCode,
      referenceSolution: data.referenceSolution.map((sol) => ({
        language: sol.language,
        completeCode: sol.initialCode,
      })),
    };

    console.log("📦 Final Payload:", formatData);

    try {
      if (isEditing && problem?.id) {
        // Update existing problem
        const response = await axiosClient.put(`/problems/update/${problem.id}`, formatData);
        if (response.status === 200) {
          alert("✅ Problem Updated Successfully");
          onSave && onSave(response.data);
        }
      } else {
        // Create new problem
        const response = await axiosClient.post("/problems/create", formatData);
        if (response.status === 201) {
          alert("✅ Problem Created Successfully");
          onSave && onSave(response.data);
        }
      }
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert("❌ Operation failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-white py-10 px-6">
      <Card className="max-w-5xl mx-auto bg-[#1b1f2a] border border-gray-700 shadow-xl rounded-2xl">
        <CardHeader className="border-b border-gray-700 pb-4">
          <CardTitle className="text-3xl font-bold text-indigo-400 tracking-wide flex justify-between items-center">
            <span>
              {isEditing ? "✏️ Edit Problem" : "🚀 Create New Problem"}
            </span>
            {onCancel && (
              <Button variant="ghost" onClick={onCancel} className="text-white hover:text-red-400">
                <X size={24} />
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-6 space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Title */}
            <div>
              <Label>Problem Title</Label>
              <Input {...register("title")} placeholder="Enter problem title" />
              {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <Label>Problem Description</Label>
              <Textarea {...register("description")} rows={6} placeholder="Describe the problem" />
              {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
            </div>

            {/* Difficulty */}
            <div>
              <Label>Difficulty</Label>
              <Select onValueChange={(val) => setValue("difficulty", val)} defaultValue="Easy">
                <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              {errors.difficulty && <p className="text-red-400 text-sm">{errors.difficulty.message}</p>}
            </div>

            {/* Tags */}
            <div>
              <Label>Tags (comma separated)</Label>
              <Input {...register("tags")} placeholder="e.g. array, sorting, dp" />
              {errors.tags && <p className="text-red-400 text-sm">{errors.tags.message}</p>}
            </div>

            {/* Visible Test Cases */}
            <div>
              <h3 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Visible Test Cases
              </h3>
              {visibleFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-800 p-3 rounded-xl mb-3">
                  <div>
                    <Label className="text-xs">Input</Label>
                    <Input placeholder="Input" {...register(`visibleTestCases.${index}.input`)} />
                    {errors.visibleTestCases?.[index]?.input && (
                      <p className="text-red-400 text-xs">{errors.visibleTestCases[index].input.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">Output</Label>
                    <Input placeholder="Output" {...register(`visibleTestCases.${index}.output`)} />
                    {errors.visibleTestCases?.[index]?.output && (
                      <p className="text-red-400 text-xs">{errors.visibleTestCases[index].output.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">Explanation</Label>
                    <Input placeholder="Explanation" {...register(`visibleTestCases.${index}.explanation`)} />
                    {errors.visibleTestCases?.[index]?.explanation && (
                      <p className="text-red-400 text-xs">{errors.visibleTestCases[index].explanation.message}</p>
                    )}
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeVisible(index)} 
                    className="col-span-3 mt-1"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {errors.visibleTestCases && (
                <p className="text-red-400 text-sm">{errors.visibleTestCases.message}</p>
              )}
              <Button 
                type="button" 
                onClick={() => addVisible({ input: "", output: "", explanation: "" })}
                className="mt-2"
              >
                + Add Visible Test Case
              </Button>
            </div>

            {/* Hidden Test Cases */}
            <div>
              <h3 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Hidden Test Cases
              </h3>
              {hiddenFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-800 p-3 rounded-xl mb-3">
                  <div>
                    <Label className="text-xs">Input</Label>
                    <Input placeholder="Input" {...register(`hiddenTestCases.${index}.input`)} />
                    {errors.hiddenTestCases?.[index]?.input && (
                      <p className="text-red-400 text-xs">{errors.hiddenTestCases[index].input.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">Output</Label>
                    <Input placeholder="Output" {...register(`hiddenTestCases.${index}.output`)} />
                    {errors.hiddenTestCases?.[index]?.output && (
                      <p className="text-red-400 text-xs">{errors.hiddenTestCases[index].output.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">Explanation</Label>
                    <Input placeholder="Explanation" {...register(`hiddenTestCases.${index}.explanation`)} />
                    {errors.hiddenTestCases?.[index]?.explanation && (
                      <p className="text-red-400 text-xs">{errors.hiddenTestCases[index].explanation.message}</p>
                    )}
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeHidden(index)} 
                    className="col-span-3 mt-1"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {errors.hiddenTestCases && (
                <p className="text-red-400 text-sm">{errors.hiddenTestCases.message}</p>
              )}
              <Button 
                type="button" 
                onClick={() => addHidden({ input: "", output: "", explanation: "" })}
                className="mt-2"
              >
                + Add Hidden Test Case
              </Button>
            </div>

            {/* Starter Code */}
            <div>
              <h3 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Starter Code
              </h3>
              {startCodeFields.map((field, index) => (
                <div key={field.id} className="bg-gray-800 p-4 rounded-xl mb-4 space-y-3">
                  <div>
                    <Label>Language</Label>
                    <Select 
                      onValueChange={(val) => setValue(`startCode.${index}.language`, val)} 
                      defaultValue={field.language}
                    >
                      <SelectTrigger><SelectValue placeholder="Choose language" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Initial Code</Label>
                    <Textarea 
                      {...register(`startCode.${index}.initialCode`)} 
                      rows={4} 
                      placeholder="Write starter code here..." 
                    />
                    {errors.startCode?.[index]?.initialCode && (
                      <p className="text-red-400 text-sm">{errors.startCode[index].initialCode.message}</p>
                    )}
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeStartCode(index)}
                  >
                    Remove Starter Code
                  </Button>
                </div>
              ))}
              {errors.startCode && (
                <p className="text-red-400 text-sm">{errors.startCode.message}</p>
              )}
              <Button 
                type="button" 
                onClick={() => addStartCode({ language: "javascript", initialCode: "" })}
                className="mt-2"
              >
                + Add Starter Code
              </Button>
            </div>

            {/* Reference Solutions */}
            <div>
              <h3 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Reference Solutions
              </h3>
              {referenceFields.map((field, index) => (
                <div key={field.id} className="bg-gray-800 p-4 rounded-xl mb-4 space-y-3">
                  <div>
                    <Label>Language</Label>
                    <Select 
                      onValueChange={(val) => setValue(`referenceSolution.${index}.language`, val)} 
                      defaultValue={field.language}
                    >
                      <SelectTrigger><SelectValue placeholder="Choose language" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Complete Code</Label>
                    <Textarea 
                      {...register(`referenceSolution.${index}.initialCode`)} 
                      rows={6} 
                      placeholder="Write full solution code here..." 
                    />
                    {errors.referenceSolution?.[index]?.initialCode && (
                      <p className="text-red-400 text-sm">{errors.referenceSolution[index].initialCode.message}</p>
                    )}
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeReference(index)}
                  >
                    Remove Reference Solution
                  </Button>
                </div>
              ))}
              {errors.referenceSolution && (
                <p className="text-red-400 text-sm">{errors.referenceSolution.message}</p>
              )}
              <Button 
                type="button" 
                onClick={() => addReference({ language: "javascript", initialCode: "" })}
                className="mt-2"
              >
                + Add Reference Solution
              </Button>
            </div>

            {/* Submit */}
            <div className="pt-4 flex gap-4">
              {onCancel && (
                <Button 
                  type="button" 
                  onClick={onCancel} 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3"
                >
                  Cancel
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3"
              >
                {isEditing ? "Update Problem" : "Create Problem"}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}