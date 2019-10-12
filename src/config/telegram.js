const TelegramBot = require('telegraf');
const {apiToken} = require('./vars');
const {getMoviesInfoHandler} = require('../controllers/telegram.controller');

const client = new TelegramBot(apiToken);

client.command('cartelera',getMoviesInfoHandler);

module.exports = client;