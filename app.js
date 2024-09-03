require('dotenv').config();

const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes/init');
const { initializeWAClient } = require('./services/waClientService');
const limiter = require('./middleware/rateLimiter');
const { logRoutes } = require('./middleware/logRoute');

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DEBUG = parseInt(process.env.DEBUG) === 1;

app.use(cors());
app.use(limiter);
app.use(express.json());

console.log('\n [GENERATE] Waiting QR Code to scan... *(be patient)\n');

initializeWAClient().then(client => {
    app.locals.client = client;
    initRoutes(app, client);

    console.clear();

    app.listen(PORT, () => {
        if (DEBUG) {
            console.log(`\n > [Info] Whatsapp number active: +${client.info.wid.user} (${client.info.pushname})`)
            console.log(`\n > [Info] Server is running: http://${HOST}:${PORT}`);
            console.log(logRoutes(app));
        } else {
            console.log(`\n > Server is running: http://${HOST}:${PORT}\n`);
        }
    });
});