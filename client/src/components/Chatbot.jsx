import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English"); // default language

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/v1/findDisease", {
        symptoms: input,
        language, // ✅ send selected language
      });

      const aiResponse = res.data;
      const formatted = `
🦠 Possible Diseases:
${aiResponse.possibleDiseases
  .map((d) => `- ${d.name}: ${d.explanation}`)
  .join("\n")}

🛡️ Preventive Measures:
${aiResponse.preventiveMeasures.map((m) => `- ${m}`).join("\n")}

👨‍⚕️ When to consult doctor:
${aiResponse.whenToConsultDoctor}
      `;

      setMessages((prev) => [...prev, { sender: "bot", text: formatted }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white shadow-xl rounded-2xl flex flex-col border z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl font-semibold">
            🧑‍⚕️ AI Health Assistant
          </div>

          {/* Language buttons */}
          <div className="flex justify-around p-2 border-b">
            {["English", "Hindi", "Punjabi"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  language === lang
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm max-h-80">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p className="text-gray-500">⏳ Analyzing...</p>}
          </div>

          {/* Input area */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder={`Enter your symptoms in ${language}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
