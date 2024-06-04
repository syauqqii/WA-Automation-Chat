const sendMessageRoute = require('./sendMessage');

module.exports = (app, client) => {
    app.use('/sendMessage', sendMessageRoute(client));
};