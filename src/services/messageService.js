const getCurutCombo = require('./curutService');
const aiService = require('./aiService');

const PREFIX_COMMAND = process.env.PREFIX_COMMAND || '.';
const DEBUG = parseInt(process.env.DEBUG) === 1;
const IS_NEED_CS = parseInt(process.env.IS_NEED_CS) === 1

const handleMessage = async (client, msg) => {
    const command = msg.body.trim();
    const fromNumber = msg.from.split('@')[0];

    if (!command.startsWith(PREFIX_COMMAND)) {
        if (IS_NEED_CS) {
            try {
                if (DEBUG) {
                    console.error(" - [messageService] AI service from " + fromNumber);
                }
                const aiResponse = await aiService(msg.body);
                await client.sendMessage(msg.from, aiResponse);
            } catch (error) {
                if (DEBUG) {
                    console.error(" - [messageService] Failed to process AI response:", error);
                }
                await client.sendMessage(msg.from, "Maaf, terjadi kesalahan saat memproses permintaan Anda.");
            }
        }
        return;
    }

    const commandBody = command.slice(PREFIX_COMMAND.length).trim();

    switch (commandBody) {
        case 'ping':
            if (DEBUG) {
                console.error(` - [messageService] Ping from ${fromNumber}`);
            }
            await msg.reply('Aku marah!! 😡');
            break;
        case 'curut-combo':
            if (DEBUG) {
                console.log(` - [messageService] Fetching curut-combo for ${fromNumber}`);
            }
            try {
                const response = await getCurutCombo();
                await client.sendMessage(msg.from, response);
            } catch (error) {
                console.error(' - [messageService] Error sending curut-combo message:', error);
                await client.sendMessage(msg.from, 'Failed to fetch curut-combo.');
            }
            break;
        default:
            console.log(` - [messageService] Unknown command '${commandBody}' from ${fromNumber}`);
            break;
    }
};

module.exports = { handleMessage };