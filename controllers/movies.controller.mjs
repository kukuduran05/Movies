import MovieService from '../services/movies.mjs';
import Boom from '@hapi/boom';

const movie = new MovieService();

export const updateMovies = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const movies = req.body;
        const result = await movie.updateMovie(idUser, movies);
        res.send(result);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const getAllUniques = async (req, res, next) => {
    try {
        const result = await movie.uniqueMovies();
        res.send(result);
    } catch (e) {
        next(Boom.badRequest(e.message));
    }
}