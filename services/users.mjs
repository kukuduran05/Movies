import DB from '../db.mjs';
import { hash } from "../utils/hashing.mjs";
import { ObjectId } from 'mongodb';

class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new DB();
    }

    async getUsers(){
        return await this.mongoDB.getAll(this.collection, {});
    }

    async saveUser({name, lastname, password, email, movies}) {
        const pass = await hash(password);
        const bodyUser = {
            name,
            lastname,
            pass,
            email,
            movies,
            suggestions: [],
            friends: [],
            lastModified: new Date()
        }
        const regex = movies.map(function (e) { return new RegExp(e, "i"); }); // make case insensitive
        const query = {
            movies: {
                $all: regex
            }
        }
        const suggestFriend = await this.mongoDB.getAll(this.collection, query);
        if (suggestFriend.length !== 0){
            suggestFriend.forEach(friend => {
                bodyUser.suggestions.push(friend.email);
                friend = friend.email;
            });
        }
        await this.mongoDB.create(this.collection, bodyUser);
        return bodyUser;
    }

    async removeUser({idUser}) {
        const query = {
            _id: ObjectId(idUser)
        }
        return await this.mongoDB.delete(this.collection, query);
    }
}

export default UserService;