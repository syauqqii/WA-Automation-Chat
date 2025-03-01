class WhatsappDTO {
    static SendMessageRequest({ to, text }) {
        if (!to || !text || (typeof to !== 'string' && !Array.isArray(to)) || typeof text !== 'string') {
            console.log('  - [WhatsappDTO::SendMessageRequest] Invalid JSON format\n');
            throw new Error("Invalid JSON format");
        }

        return { to, text };
    }

    static SendMessageWithFileRequest({ to, text, file }) {
        if (!to || !text || (typeof to !== 'string' && !Array.isArray(to)) || typeof text !== 'string' || !file) {
            console.log('  - [WhatsappDTO::SendMessageWithFileRequest] Invalid JSON format or missing file\n');
            throw new Error("Invalid JSON format");
        }

        return { to, text, file };
    }
}

module.exports = WhatsappDTO;