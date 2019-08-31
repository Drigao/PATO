const fetch = require('node-fetch');
const jsonata = require('jsonata');

const cities = {
    "madrid": "28000"
};

const cinemas = {
    "parquesur": {
        "code": "190",
        "city": "28000"
    }
};

const apiUrl = 'https://www.cinesa.es/Cines/Horarios/';


const formatInfo = data => {
    const today = data.cartelera.find(obj => {
        return obj.dia == '2019-08-31'
    });
    const movies = today.peliculas;
    const formated = movies.map(movie => {
        var timetable = jsonata('cines.tipos.salas.**.sesiones.{"hour": hora, "link": ao}').evaluate(movie);
        return {
            'movie': movie.titulo,
            'schedule': JSON.stringify(timetable)
        }
    });
    return formated;
};
const getRawInfo = (cinema) => fetch(apiUrl + cinemas[cinema].code + '/' + cinemas[cinema].city)
    .then(res => res.json());

const getMoviesInfo = (cinema) => getRawInfo(cinema).then(formatInfo)

module.exports = {
    getRawInfo,
    getMoviesInfo
};

