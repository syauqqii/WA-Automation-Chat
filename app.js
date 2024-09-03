require('dotenv').config();

const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes/init');
const { initializeWAClient } = require('./services/waClientService');
const limiter = require('./middleware/rateLimiter');

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DEBUG = parseInt(process.env.DEBUG) === 1;

app.use(cors());
app.use(limiter);
app.use(express.json());

initializeWAClient().then(client => {
    app.locals.client = client;
    initRoutes(app, client);

    console.clear();
    app.listen(PORT, () => {
        if (DEBUG) {
            console.log(`\n > [app] Server is running - http://${HOST}:${PORT}\n`);
        } else {
            console.log(`\n > Server is running - http://${HOST}:${PORT}\n`);
        }
    });
});