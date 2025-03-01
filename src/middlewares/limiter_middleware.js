const rateLimit = require("express-rate-limit");

class LimiterMiddleware {
    constructor() {
        this.LIMIT_MINUTES = process.env.LIMIT_MINUTES || 1;
        this.LIMIT_REQUEST = process.env.LIMIT_REQUEST || 10;

        this.limiter = rateLimit({
            windowMs: this.LIMIT_MINUTES * 60 * 1000,
            max: this.LIMIT_REQUEST,
            handler: function (req, res) {
                console.log(`  - [LimiterMiddleware] Too many requests from ${req.ip}`);

                res.status(429).json({
                    success: false,
                    message: "Too many requests. Please try again later",
                });
            },
        });
    }

    getConfig() {
        return this.limiter;
    }
}

module.exports = new LimiterMiddleware();