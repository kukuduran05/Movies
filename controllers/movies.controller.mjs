import DB from '../db.mjs';
import Boom from '@hapi/boom';
import { ObjectId } from 'mongodb';

export const updateMovies = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const movies = req.body;
        const where = {
            _id: ObjectId(idUser)
        }
        const query = {
            $set: { 
                movies: movies.movies,
                lastModified: new Date()
            }
        }
        const db = new DB();
        const user = await db.getOne('users', where);
        const currentDate = new Date();
        const lastDate = user.lastModified;
        var diffMs = (currentDate - lastDate);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        if (diffMins > 1) {
            await db.update('users', where, query);
            const info = await db.getOne('users', {_id: ObjectId(idUser)});
            return res.send(info);
        } else {
            next(Boom.badRequest("You must wait a minute to update the movie."));
        }   
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const getAllUniques = async (req, res, next) => {
    try {
        const db = new DB();
        const movies = await db.getAllUniques('users', 'movies');
        const lowerCase = movies.map(title => title.toLowerCase());
        const result = [...new Set(lowerCase)];
        res.send(result);
    } catch (e) {
        next(Boom.badRequest(e.message));
    }
}