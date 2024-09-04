const express = require('express');
const messageController = require('../controllers/messageController');

module.exports = (client) => {
    const router = express.Router();

    router.post('/', (req, res) => messageController.sendMessage(client, req, res));

    return router;
};