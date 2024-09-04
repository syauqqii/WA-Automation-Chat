require('dotenv').config();

const express = require('express');
const cors = require('cors');
const initRoutes = require('./src/routes/init');
const { initializeWAClient } = require('./src/services/waClientService');
const limiter = require('./src/middleware/rateLimiter');
const { logRoutes } = require('./src/middleware/logRoute');

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DEBUG = parseInt(process.env.DEBUG) === 1;

app.use(cors());
app.use(limiter);
app.use(express.json());

console.clear();
console.log('\n [INFORMATION] Checking your session... *(be patient)\n');

initializeWAClient().then(client => {
    app.locals.client = client;
    initRoutes(app, client);

    console.clear();
    app.listen(PORT, () => {
        if (DEBUG) {
            console.log(`\n > [Info] Whatsapp number active: +${client.info.wid.user} (${client.info.pushname})`)
            console.log(`\n > [Info] Server is running: http://${HOST}:${PORT}`);
            console.log(logRoutes(app));
            console.log(' > [Docs] URL: https://github.com/syauqqii/WA-Automation-Chat\n')
        } else {
            console.log(`\n > Server is running: http://${HOST}:${PORT}\n`);
        }
    });
});