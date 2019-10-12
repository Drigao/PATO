const {getMoviesInfo} = require('../services/cinesa');
const extra = require('telegraf/extra');
const markup = require('telegraf/markup');

async function getMoviesInfoHandler(ctx) {
    const movies = await getMoviesInfo('parquesur');
    ctx.reply('Cartelera para el cine:')
        .then(() => {
            movies.forEach(movie => {
                const sessions = [];
                for (sch in movie.schedule) {
                    if (isNaN(parseInt(sch))) continue;
                    const session = movie.schedule[sch];
                    sessions.push(markup.urlButton(session.hour, session.purchase_link))
                }
                const replyOptions = markup.inlineKeyboard(sessions).extra();
                ctx.telegram.sendPhoto(ctx.from.id,movie.cover,replyOptions)
            });
        });
}

module.exports = {
    getMoviesInfoHandler
};