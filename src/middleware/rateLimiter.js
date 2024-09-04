const rateLimit = require('express-rate-limit');

const LIMIT_MINUTES = process.env.LIMIT_MINUTES;
const LIMIT_REQUEST = process.env.LIMIT_REQUEST;
const DEBUG = parseInt(process.env.DEBUG) === 1;

const limiter = rateLimit({
    windowMs: LIMIT_MINUTES * 60 * 1000,
    max: LIMIT_REQUEST,
    // message: 'Too many requests from your IP address. Please try again later.',
    handler: function (req, res) {
        if (DEBUG) {
            console.log(`  - [rateLimit] Too many requests from ${req.ip}`);
        }
        res.status(429).send('Too many requests from your IP address. Please try again later.');
    }
});

module.exports = limiter;
