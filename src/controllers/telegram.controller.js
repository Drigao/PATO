const {getMoviesInfo} = require('../services/cinesa');

async function getMoviesInfoHandler(ctx) {
    const movies = await getMoviesInfo('parquesur');

    ctx.reply('Cartelera para el cine:')
        .then(() => {
            movies.forEach(movie => {

            });
        });
}