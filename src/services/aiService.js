const { GoogleGenerativeAI, GoogleGenerativeAIResponseError, GoogleGenerativeAIError } = require("@google/generative-ai");
const { initialCharacter, safetySettings, aiModel } = require('../config/ai');

const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

async function aiService(prompt) {
    const finalPrompt = `${initialCharacter}\nPertanyaan: ${prompt}`;

    try {
        const modelAi = genAI.getGenerativeModel({ model: aiModel, safetySettings });
        const result = await modelAi.generateContent(finalPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        if (error instanceof GoogleGenerativeAIResponseError || error instanceof GoogleGenerativeAIError) {
            console.error("  - [aiService] Error from Google Generative AI:", error.message);
        } else {
            console.error("  - [aiService]An unexpected error occurred:", error.message);
        }
        throw error;
    }
}

module.exports = aiService;