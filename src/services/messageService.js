const AIService = require("./ai_service");

const PREFIX_COMMAND = process.env.PREFIX_COMMAND || '.';
const DEBUG = parseInt(process.env.DEBUG) === 1;
let IS_NEED_CS = parseInt(process.env.IS_NEED_CS) === 1

const listContact = new Map();
const RESET_INTERVAL_HOURS = 5 * 60 * 60 * 1000;

const responseMessage = `
🙏 Terima kasih sudah menghubungi kami! 😊
Pesan Anda telah kami terima, dan tim kami akan segera membalasnya.

Mohon bersabar ya, kami akan memberikan respon secepat mungkin. Sementara itu, jika ada hal lain yang ingin ditanyakan, jangan ragu untuk mengirimkan pesan kembali. 🙌

✨ Semoga hari Anda menyenangkan! ✨`;

const handleMessage = async (client, msg) => {
    const command = msg.body.trim();
    const fromNumber = msg.from.split('@')[0];
    const currentTime = Date.now();

    if (msg.from.includes('@g.us')) {
        if (DEBUG) {
            console.log("  - [messageService] Got message from group!");
        }
        return;
    }

    if (listContact.has(msg.from)) {
        const lastSentTime = listContact.get(msg.from);
        if (currentTime - lastSentTime > RESET_INTERVAL_HOURS) {
            listContact.delete(msg.from);
        }
    }

    if (!command.startsWith(PREFIX_COMMAND)) {
        if (IS_NEED_CS) {
            try {
                if (msg.type === 'chat') {
                    if (DEBUG) {
                        console.log("  - [messageService] AI service from " + fromNumber);
                    }
                    const aiResponse = await AIService.GenerateAnswer(msg.body);
                    await client.sendMessage(msg.from, aiResponse);
                } else {
                    if (!listContact.has(msg.from)) {
                        await client.sendMessage(msg.from, responseMessage.trim());
                        listContact.set(msg.from, currentTime);
                    }
                }
            } catch (error) {
                if (DEBUG) {
                    console.error("  - [messageService] Failed to process AI response:", error.message);
                }
                await client.sendMessage(msg.from, "Maaf, terjadi kesalahan saat memproses permintaan Anda.");
            }
        } else {
            if (DEBUG) {
                console.error("  - [messageService] Got message from: ", fromNumber);
            }

            if (!listContact.has(msg.from)) {
                await client.sendMessage(msg.from, responseMessage.trim());
                listContact.set(msg.from, currentTime);
            }
        }
        return;
    }

    const commandBody = command.slice(PREFIX_COMMAND.length).trim();

    switch (commandBody) {
        case 'ping':
            if (DEBUG) {
                console.log(`  - [messageService] Ping from ${fromNumber}`);
            }
            await msg.reply('Aku marah!! 😡');
            break;
        case 'switch':
            if (DEBUG) {
                console.log(`  - [messageService] AI Service Switched - Command from: ${fromNumber}`);
            }
            IS_NEED_CS = IS_NEED_CS === 1 ? 0 : 1;
            const statusMessage = IS_NEED_CS === 1 ? 'AI service: ON' : 'AI service: OFF';
            await msg.reply(statusMessage);
            break;
        default:
            console.log(`  - [messageService] Unknown command '${commandBody}' from ${fromNumber}`);
            break;
    }
};

module.exports = { handleMessage };