const fetch = require('node-fetch');
const jsonata = require('jsonata');
const {apiUrl, cinemas} = require('../config/cinesa');
const dateFormat = require('dateformat');



const formatInfo = data => {
    const today = data.cartelera.find(obj => {
        return obj.dia == '2019-08-31'
    });
    const movies = today.peliculas;
    const formated = movies.map(movie => {
        var timetable = jsonata('cines.tipos.salas.**.sesiones.{"hour": hora, "purchase_link": ao}').evaluate(movie);
        return {
            'title': movie.titulo,
            'cover': movie.cartel,
            'schedule': timetable
        }
    });
    return formated;
};
const getRawInfo = (cinema) => fetch(apiUrl + cinemas[cinema].code + '/' + cinemas[cinema].city)
    .then(res => res.json());

const getMoviesInfo = (cinema, day) => getRawInfo(cinema).then(formatInfo)

module.exports = {
    getRawInfo,
    getMoviesInfo
};

