const TelegramBot = require('telegraf');
const {apiToken} = require('./vars');

const client = new TelegramBot(apiToken);

module.exports = client;