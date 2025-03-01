const { GoogleGenerativeAI, GoogleGenerativeAIResponseError, GoogleGenerativeAIError } = require("@google/generative-ai");
const { AI_MODEL, SAFETY_SETTINGS, SYSTEM_INSTRUCTION } = require("../configs/ai_config");

class AIService {
    static async GenerateAnswer(prompt) {
        try {
            const generative_ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

            const modelAi = generative_ai.getGenerativeModel({
                model: AI_MODEL,
                systemInstruction: SYSTEM_INSTRUCTION,
                safetySettings: SAFETY_SETTINGS
            });
    
            const final_prompt = `Chat User: ${prompt}`;
    
            const result = await modelAi.generateContent(final_prompt);
            const response = result.response;

            return response.text();
        } catch(error) {
            if (error instanceof GoogleGenerativeAIResponseError || error instanceof GoogleGenerativeAIError) {
                console.error("  - [AIService::GenerateAnswer] Error from Google Generative AI: ", error.message);
            } else {
                console.error("  - [AIService::GenerateAnswer] An unexpected error occurred: ", error.message);
            }
    
            throw new Error(error.message);
        }
    }
}

module.exports = AIService;