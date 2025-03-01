const AIService = require("../services/ai_service");

class WhatsappHandler {
    constructor() {
        this.PREFIX_COMMAND = process.env.PREFIX_COMMAND || ".";
        this.ACTIVATE_AI = parseInt(process.env.ACTIVATE_AI) === 1;

        this.LIST_CONTACT = new Map();
        this.RESET_INTERVAL_HOURS = 5 * 60 * 60 * 1000;

        this.response_message = `
[ *PESAN OTOMATIS* ]

Halo, maaf, saya sedang sibuk saat ini.
Silakan hubungi saya kembali nanti.

Terima kasih.
        `;

        this.error_response = "Maaf, terjadi kesalahan saat memproses permintaan Anda.";
    }

    async HandleMessage(client, msg) {
        const command = msg.body.trim();
        const fromNumber = msg.from.split('@')[0];
        const currentTime = Date.now();

        if (this.isGroupMessage(msg)) return;
        this.resetContactTimeout(msg, currentTime);

        if (!command.startsWith(this.PREFIX_COMMAND)) {
            await this.handleAIResponse(client, msg, fromNumber, currentTime);
            return;
        }

        const commandBody = command.slice(this.PREFIX_COMMAND.length).trim();
        await this.handleCommand(client, msg, fromNumber, commandBody);
    }

    isGroupMessage(msg) {
        if (msg.from.includes('@g.us')) {
            console.log("  - [WhatsappHandler] Got message from group!");
            return true;
        }

        return false;
    }

    resetContactTimeout(msg, currentTime) {
        if (this.LIST_CONTACT.has(msg.from)) {
            const lastSentTime = this.LIST_CONTACT.get(msg.from);
            if (currentTime - lastSentTime > this.RESET_INTERVAL_HOURS) {
                this.LIST_CONTACT.delete(msg.from);
            }
        }
    }

    async handleAIResponse(client, msg, fromNumber, currentTime) {
        if (this.ACTIVATE_AI) {
            try {
                if (msg.type === 'chat') {
                    console.log(`  - [WhatsappHandler] AI service from ${fromNumber}`);
                    const aiResponse = await AIService.GenerateAnswer(msg.body);
                    await client.sendMessage(msg.from, aiResponse);
                } else {
                    await this.sendAutoReply(client, msg, currentTime);
                }
            } catch (error) {
                console.error(`  - [WhatsappHandler] Failed to process AI response: ${error.message}`);
                await client.sendMessage(msg.from, this.error_message.trim());
            }
        } else {
            console.log(`  - [WhatsappHandler] Got message from: ${fromNumber}`);
            await this.sendAutoReply(client, msg, currentTime);
        }
    }

    async sendAutoReply(client, msg, currentTime) {
        if (!this.LIST_CONTACT.has(msg.from)) {
            await client.sendMessage(msg.from, this.response_message.trim());
            this.LIST_CONTACT.set(msg.from, currentTime);
        }
    }

    async handleCommand(client, msg, fromNumber, commandBody) {
        switch (commandBody) {
            case 'ping':
                console.log(`  - [WhatsappHandler] Ping from ${fromNumber}`);
                await msg.reply('pong');
                break;
            case 'ai':
                await this.toggleAIService(msg, fromNumber);
                break;
            default:
                console.log(`  - [WhatsappHandler] Unknown command '${commandBody}' from ${fromNumber}`);
                break;
        }
    }

    async toggleAIService(msg, fromNumber) {
        this.ACTIVATE_AI = !this.ACTIVATE_AI;
        console.log(`  - [WhatsappHandler] AI Service Switched - Command from: ${fromNumber}`);
        const statusMessage = this.ACTIVATE_AI ? 'AI: ON' : 'AI: OFF';
        await msg.reply(statusMessage);
    }
}

module.exports = new WhatsappHandler();