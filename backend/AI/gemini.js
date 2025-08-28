import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const knowAboutDisease = async (req, res) => {
  try {
    // Get the symptoms and language from the request body
    const { symptoms, language } = req.body;

    if (!symptoms || !language) {
      return res.status(400).json({
        message: "Please provide both symptoms and preferred language",
      });
    }

    // Create the prompt
    const prompt = `
    The user has reported the following symptoms: "${symptoms}".
    Please analyze these symptoms and provide:
    1. Possible diseases related to these symptoms
    2. A brief explanation of each disease
    3. Preventive measures
    4. When to consult a doctor

    ⚠️ Respond strictly in JSON format, with keys: 
    {
      "possibleDiseases": [ { "name": "", "explanation": "" } ],
      "preventiveMeasures": [],
      "whenToConsultDoctor": ""
    }

    Make sure the entire response is in **${language}**.
    Do not include anything outside JSON.
    `;

    const result = await model.generateContent(prompt);
    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    const jsonString = responseText.replace(/```json|```/g, "").trim();

    try {
      const responseJson = JSON.parse(jsonString);
      res.status(200).json(responseJson);
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      res.status(500).json({
        message: "Invalid AI response format",
        rawResponse: responseText,
      });
    }
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: error.message });
  }
};
