import DB from '../db.mjs';
import { hash } from "../utils/hashing.mjs";
import Boom from '@hapi/boom';
import { ObjectId } from 'mongodb';


export const getUsers = async (req, res, next ) => {
    try {
        const db = new DB();
        const users = await db.getAll('users', {});
        return res.send(users);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const createUser = async (req, res, next ) => {
    try {
        const {name, lastname, password, email, movies} = req.body;
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
        const db = new DB();
        const regex = movies.map(function (e) { return new RegExp(e, "i"); }); // make case insensitive
        const query = {
            movies: {
                $all: regex
            }
        }
        const suggestFriend = await db.getAll('users', query);
        if (suggestFriend){
            suggestFriend.forEach(friend => {
                bodyUser.suggestions.push(friend.email);
                friend = friend.email;
            });
        }
        await db.create('users', bodyUser);
        return res.send(bodyUser);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const query = {
            _id: ObjectId(idUser)
        }
        const db = new DB();
        await db.delete('users', query);
        res.send("User Deleted!");
    } catch (e) {
        next(Boom.badRequest(e.message));
    }
}