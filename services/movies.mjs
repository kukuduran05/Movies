import DB from '../db.mjs';
import { ObjectId } from 'mongodb';

class MovieService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new DB();
    }

    async updateMovie(idUser, movies) {
        const where = {
            _id: ObjectId(idUser)
        }
        const query = {
            $set: { 
                movies: movies.movies,
                lastModified: new Date()
            }
        }
        const user = await this.mongoDB.getAll(this.collection, where);
        const currentDate = new Date();
        const lastDate = user[0].lastModified;
        var diffMs = (currentDate - lastDate);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        if (diffMins > 1) {
            await this.mongoDB.update(this.collection, where, query);
            const info = await this.mongoDB.getAll(this.collection, {_id: ObjectId(idUser)});
            return info;
        } else {
            return {msg: "You must wait a minute to update the movie."};
        }  
    }

    async uniqueMovies() {
        const movies = await this.mongoDB.getAllUniques(this.collection, 'movies');
        const lowerCase = movies.map(title => title.toLowerCase());
        const result = [...new Set(lowerCase)];
        return result;
    }
}

export default MovieService;