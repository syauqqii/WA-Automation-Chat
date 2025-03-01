require('dotenv').config();

const express = require('express');
const cors = require('cors');

const InitialRoutes = require("./routes");
const { initializeWAClient } = require("./clients/whatsapp_client");
const limiter = require("./middlewares/limiter_middleware");

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DEBUG = parseInt(process.env.DEBUG) === 1;
const IS_NEED_CS = parseInt(process.env.IS_NEED_CS) === 1;

app.use(cors());
app.use(limiter.getConfig());
app.use(express.json());

console.clear();
console.log('\n [INFORMATION] Checking your session... *(be patient)\n');

initializeWAClient().then(client => {
    app.locals.client = client;
    InitialRoutes(app, client);

    console.clear();
    app.listen(PORT, () => {
        if (DEBUG) {
            console.log(`\n > [Info] Whatsapp number active: +${client.info.wid.user} (${client.info.pushname}) ${IS_NEED_CS ? "[AI Active]" : ""}`);
            console.log(`\n > [Info] Server is running: http://${HOST}:${PORT}\n`);
            console.log(' > [Docs] URL: https://github.com/syauqqii/WA-Automation-Chat\n')
        } else {
            console.log(`\n > Server is running: http://${HOST}:${PORT}\n`);
        }
    });
});