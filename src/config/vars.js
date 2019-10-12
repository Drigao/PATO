const { join } = require('path');

require('dotenv-safe').config({
    example: join(__dirname, '..', '..', '.env.example'),
    path: join(__dirname, '..', '..', '.env'),
});

module.exports = {
    apiToken: process.env.TELEGRAM_API_TOKEN,
}