const waService = require('../services/waService');
const DEBUG = parseInt(process.env.DEBUG) === 1;

exports.sendMessage = async (client, req, res) => {
    const { phoneNumber, messageText } = req.body;

    if (!phoneNumber || !messageText || (typeof phoneNumber !== 'string' && !Array.isArray(phoneNumber)) || typeof messageText !== 'string') {
        if (DEBUG){
            console.log('  - [messageController] Invalid JSON format\n');
        }
        return res.status(400).json({ success: false, message: 'Invalid JSON format' });
    }

    try {
        const results = await waService.sendMessages(client, phoneNumber, messageText);
        if (DEBUG){
            console.log('  - [messageController] Message sent successfully\n');
        }
        res.status(200).json(results);
    } catch (error) {
        if (DEBUG){
            console.log('  - [messageController] Failed to send message: ' + error + '\n');
        }
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
};