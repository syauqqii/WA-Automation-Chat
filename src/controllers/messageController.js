const waService = require('../services/whatsappService');
const DEBUG = parseInt(process.env.DEBUG) === 1;

exports.sendMessage = async (client, req, res) => {
    const { to, text } = req.body;

    if (!to || !text || (typeof to !== 'string' && !Array.isArray(to)) || typeof text !== 'string') {
        if (DEBUG){
            console.log('  - [messageController] Invalid JSON format\n');
        }
        return res.status(400).json({ success: false, message: 'Invalid JSON format' });
    }

    try {
        const results = await waService.sendMessage(client, to, text);
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

exports.sendMessageMedia = async (client, req, res) => {
    const { to, text } = req.body;
    const mediaFile = req.file;

    if (!to || !text || (typeof to !== 'string' && !Array.isArray(to)) || typeof text !== 'string' || !mediaFile) {
        if (DEBUG) {
            console.log('  - [messageController] Invalid JSON format or missing file\n');
        }
        return res.status(400).json({ success: false, message: 'Invalid JSON format or missing file' });
    }

    try {
        const MessageMedia = require('whatsapp-web.js').MessageMedia;
        const media = MessageMedia.fromFilePath(mediaFile.path);

        const results = await waService.sendMediaMessage(client, to, text, mediaFile.path);
        if (DEBUG) {
            console.log('  - [messageController] Media message sent successfully\n');
        }
        res.status(200).json(results);
    } catch (error) {
        if (DEBUG) {
            console.log('  - [messageController] Failed to send media message: ' + error.message + '\n');
        }
        res.status(500).json({ success: false, message: 'Failed to send media message' });
    }
};