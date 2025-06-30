import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (inputText) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Summarize the following text into 3–5 concise bullet points.
    Return it as a JSON array like:
    [ "Point 1", "Point 2", "Point 3" ]

    TEXT: ${inputText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  try {
    // const cleaned = rawText
    //   .replace(/^```json\s*/i, '')
    //   .replace(/^```\s*/i, '')
    //   .replace(/```$/, '')
    //   .trim();

    return JSON.parse(text);
  } catch (err) {
    return { error: "Could not parse JSON", raw: text };
  }
};
