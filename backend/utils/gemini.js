require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai'); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 

async function generatePollWithAI(topic, optionCount = 4) {
  const prompt = `Create a poll about "${topic}".
  The poll should have one question and exactly ${optionCount} options.
  Return only valid JSON:
  {
    "question": "string",
    "options": ["opt1","opt2",...]
  }`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);

  try {
    const jsonText = result.response.text().match(/\{[\s\S]*\}/)[0];
    return JSON.parse(jsonText);
  } catch (err) {
    console.error("Parsing error:", err);
    return null;
  }
}

module.exports = { generatePollWithAI };
