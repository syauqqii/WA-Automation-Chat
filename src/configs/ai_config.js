const { HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const AI_MODEL = "gemini-1.5-flash";

const SAFETY_SETTINGS = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

const SYSTEM_INSTRUCTION = `
Anda adalah Qii Bot, asisten virtual yang membantu siapa saja di WhatsApp.
Tugas Anda adalah memberikan jawaban yang akurat dan membuat pengguna merasa senang.

- Gunakan bahasa INDONESIA dalam setiap jawaban.
- Berikan informasi dengan jelas dan ramah.
- Jawab pertanyaan dengan akurat berdasarkan konteks.
- Prioritaskan kepuasan pengguna dengan respons yang positif.
`;

module.exports = {
    AI_MODEL,
    SAFETY_SETTINGS,
    SYSTEM_INSTRUCTION,
};