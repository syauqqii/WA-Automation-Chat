const delay = require('../helpers/delay');
const { successResponse, errorResponse } = require('../helpers/responses');
const DEBUG = parseInt(process.env.DEBUG) === 1;

exports.sendMessages = async (client, phoneNumber, messageText) => {
    if (Array.isArray(phoneNumber)) {
        const results = [];
        for (const num of phoneNumber) {
            const isContact = await client.checkNumberStatus(`${num}@c.us`);

            if (isContact.numberExists) {
                await client.sendText(`${num}@c.us`, messageText);
                if (DEBUG){
                    console.log('  - [waService] Message sent successfully');
                }
                results.push(successResponse(num));

                const delayTime = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000);
                await delay(delayTime);
            } else {
                if (DEBUG){
                    console.log('  - [waService] Recipient number (' + num + ') is not registered in contacts. Failed to send message');
                }
                results.push(errorResponse(num, 'Recipient number is not registered in contacts. Failed to send message'));
            }
        }

        return results;
    } else {
        const isContact = await client.checkNumberStatus(`${phoneNumber}@c.us`);
        if (isContact.numberExists) {
            await client.sendText(`${phoneNumber}@c.us`, messageText);
            if (DEBUG){
                console.log('  - [waService] Message sent successfully');
            }

            return successResponse(phoneNumber);
        } else {
            if (DEBUG){
                console.log('  - [waService] Recipient number is not registered in contacts');
            }

            return errorResponse(phoneNumber, 'Recipient number is not registered in contacts. Failed to send message');
        }
    }
};