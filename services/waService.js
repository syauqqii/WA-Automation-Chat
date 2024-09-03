const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

const delay = require('../helpers/delay');
const { successResponse, errorResponse } = require('../helpers/responses');
const DEBUG = parseInt(process.env.DEBUG) === 1;

exports.sendMessage = async (client, to, text) => {
    if (Array.isArray(to)) {
        const results = [];
        for (const num of to) {
            try {
                const chat = await client.getChatById(`${num}@c.us`);
                await chat.sendMessage(text);

                if (DEBUG) {
                    console.log(`  - [waService] Message sent successfully to ${num}`);
                }
                results.push(successResponse(num));

                const delayTime = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000);
                await delay(delayTime);
            } catch (error) {
                if (DEBUG) {
                    console.log('  - [waService] Error sending message to ' + num + ': ' + error.message);
                }
                results.push(errorResponse(num, 'Failed to send message: ' + error.message));
            }
        }

        return results;
    } else {
        try {
            const chat = await client.getChatById(`${to}@c.us`);
            await chat.sendMessage(text);

            if (DEBUG) {
                console.log(`  - [waService] Message sent successfully to ${num}`);
            }

            return successResponse(to);
        } catch (error) {
            if (DEBUG) {
                console.log('  - [waService] Error sending message to ' + to + ': ' + error.message);
            }

            return errorResponse(to, 'Failed to send message: ' + error.message);
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
                    console.log(`  - [waService] Media message sent successfully to ${num}`);
                }
                results.push(successResponse(num));
            } catch (error) {
                if (DEBUG) {
                    console.log(`  - [waService] Failed to send media message to ${num}: ${error}`);
                }
                results.push(errorResponse(num, 'Failed to send media message: ' + error.message));
            }
        }
    } else {
        try {
            const media = MessageMedia.fromFilePath(mediaFilePath);

            await client.sendMessage(`${tos}@c.us`, media, { caption: text });

            if (DEBUG) {
                console.log(`  - [waService] Media message sent successfully to ${tos}`);
            }
            results.push(successResponse(tos));
        } catch (error) {
            if (DEBUG) {
                console.log(`  - [waService] Failed to send media message to ${tos}: ${error}`);
            }
            results.push(errorResponse(tos, 'Failed to send media message: ' + error.message));
        }
    }

    if (fs.existsSync(mediaFilePath)) {
        fs.unlinkSync(mediaFilePath);
    } else {
        if (DEBUG) {
            console.log('  - [waService] Media file does not exist: ' + mediaFilePath);
        }
    }

    return results;
};