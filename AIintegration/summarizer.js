import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (req, res) => {
  try {
    const { inputText } = req.body;
    if (!inputText)
      return res.status(400).json({ error: "Text field is required" });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Summarize the following text into 3–5 concise bullet points.
    Return it as a JSON array like:
    [ "Point 1", "Point 2", "Point 3" ]

    TEXT: ${inputText}
  `;
    const result = await model.generateContent(prompt);
    console.log(result);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    return res.send(text);
    // return res.status(200).json({ summary: text });
  } catch (error) {
    return res.status(500).json({ error: "Could not parse JSON" });
  }
};
