const getCurutCombo = require('./curutService');
const PREFIX_COMMAND = process.env.PREFIX_COMMAND || '.';
const DEBUG = parseInt(process.env.DEBUG) === 1;

const handleMessage = async (client, msg) => {
    const command = msg.body.trim();
    const fromNumber = msg.from.split('@')[0];

    if (!command.startsWith(PREFIX_COMMAND)) {
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