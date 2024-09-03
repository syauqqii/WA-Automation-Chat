const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const DEBUG = parseInt(process.env.DEBUG) === 1;

exports.initializeWAClient = () => {
    return new Promise((resolve, reject) => {
        const client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        client.on('qr', qr => {
            qrcode.generate(qr, { small: true });
            console.log(' [Info] QR code received, scan it with your WhatsApp app.');
        });

        client.on('ready', () => {
            console.log(' [Info] Client is ready!');
            resolve(client);
        });

        client.on('auth_failure', msg => {
            console.error(' [Error] Auth failure:', msg);
            reject(new Error('Auth failure'));
        });

        client.on('error', error => {
            if (DEBUG) {
                console.error(' [Error] Error in WA client:', error);
            }
            reject(error);
        });

        client.on('message', msg => {
            if (msg.body == '.ping') {
                if (DEBUG) {
                    console.error(` - [waClientService] Ping from ${msg.from.split('@')[0]}`);
                }
                msg.reply('Aku marah!! 😡');
            }
        });

        client.initialize();
    });
};