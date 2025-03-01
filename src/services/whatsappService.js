const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

const GeneralUtil = require("../utils/general_util");

const DEBUG = parseInt(process.env.DEBUG) === 1;
const MIN_DELAY_EVERY_CHAT = parseInt(process.env.MIN_DELAY_EVERY_CHAT)
const MAX_DELAY_EVERY_CHAT = parseInt(process.env.MAX_DELAY_EVERY_CHAT)

exports.sendMessage = async (client, to, text) => {
    if (Array.isArray(to)) {
        const results = [];
        for (const num of to) {
            try {
                const chat = await client.getChatById(`${num}@c.us`);
                await chat.sendMessage(text);

                if (DEBUG) {
                    console.log(`  - [whatsappService] Message sent successfully to ${num}`);
                }
                results.push(GeneralUtil.SuccessResponse(num));

                const delayTime = Math.floor(Math.random() * ((MAX_DELAY_EVERY_CHAT * 1000) - (MIN_DELAY_EVERY_CHAT * 1000) + 1) + (MIN_DELAY_EVERY_CHAT * 1000));
                await GeneralUtil.Delay(delayTime);
            } catch (error) {
                if (DEBUG) {
                    console.log('  - [whatsappService] Error sending message to ' + num + ': ' + error.message);
                }
                results.push(GeneralUtil.ErrorResponse(num, 'Failed to send message: ' + error.message));
            }
        }

        return results;
    } else {
        try {
            const chat = await client.getChatById(`${to}@c.us`);
            await chat.sendMessage(text);

            if (DEBUG) {
                console.log(`  - [whatsappService] Message sent successfully to ${to}`);
            }

            return GeneralUtil.SuccessResponse(to);
        } catch (error) {
            if (DEBUG) {
                console.log('  - [whatsappService] Error sending message to ' + to + ': ' + error.message);
            }

            return GeneralUtil.ErrorResponse(to, 'Failed to send message: ' + error.message);
        }
    }
};

exports.sendMediaMessage = async (client, tos, text, mediaFilePath) => {
    if (!mediaFilePath || typeof mediaFilePath !== 'string') {
        throw new Error('Invalid mediaFilePath');
    }

    const results = [];

    if (Array.isArray(tos)) {
        for (const num of tos) {
            try {
                const media = MessageMedia.fromFilePath(mediaFilePath);

                await client.sendMessage(`${num}@c.us`, media, { caption: text });

                if (DEBUG) {
                    console.log(`  - [whatsappService] Media message sent successfully to ${num}`);
                }
                results.push(GeneralUtil.SuccessResponse(num));

                const delayTime = Math.floor(Math.random() * ((MAX_DELAY_EVERY_CHAT * 1000) - (MIN_DELAY_EVERY_CHAT * 1000) + 1) + (MIN_DELAY_EVERY_CHAT * 1000));
                await GeneralUtil.Delay(delayTime);
            } catch (error) {
                if (DEBUG) {
                    console.log(`  - [whatsappService] Failed to send media message to ${num}: ${error}`);
                }
                results.push(GeneralUtil.ErrorResponse(num, 'Failed to send media message: ' + error.message));
            }
        }
    } else {
        try {
            const media = MessageMedia.fromFilePath(mediaFilePath);

            await client.sendMessage(`${tos}@c.us`, media, { caption: text });

            if (DEBUG) {
                console.log(`  - [whatsappService] Media message sent successfully to ${tos}`);
            }
            results.push(GeneralUtil.SuccessResponse(tos));
        } catch (error) {
            if (DEBUG) {
                console.log(`  - [whatsappService] Failed to send media message to ${tos}: ${error}`);
            }
            results.push(GeneralUtil.ErrorResponse(tos, 'Failed to send media message: ' + error.message));
        }
    }

    if (fs.existsSync(mediaFilePath)) {
        fs.unlinkSync(mediaFilePath);
    } else {
        if (DEBUG) {
            console.log('  - [whatsappService] Media file does not exist: ' + mediaFilePath);
        }
    }

    return results;
};