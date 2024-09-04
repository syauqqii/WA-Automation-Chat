const sendMessageRoute = require('./sendMessage');
const sendMessageMedia = require('./sendMessageMedia');

module.exports = (app, client) => {
    app.use('/sendMessage', sendMessageRoute(client));
    app.use('/sendMessageMedia', sendMessageMedia(client));
};