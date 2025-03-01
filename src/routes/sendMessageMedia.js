const express = require('express');
const multer = require('multer');
const { sendMessageMedia } = require('../controllers/messageController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = (client) => {
    const router = express.Router();

    router.post('/', upload.single('mediaFile'), (req, res) => {
        sendMessageMedia(client, req, res);
    });

    return router;
};