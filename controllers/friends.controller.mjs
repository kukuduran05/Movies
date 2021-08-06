import DB from '../db.mjs';
import Boom from '@hapi/boom';
import { ObjectId } from 'mongodb';

export const sugested = async (req, res, next) => {
    try {
        // Get Info from current user
        const db = new DB();
        const CurrentUser = await getCurrentUser('users', {email: req.user.email});
        const moviesCurrentUser = CurrentUser.movies;
        // Search friends with minimum one same movie
        const regex = caseInsensitive(moviesCurrentUser);
        const query = {
            movies: regex
        }
        const userInfo = await db.getAll('users', query);
        // Return other friends not current user
        const result = userInfo.filter(user => user.email !== CurrentUser.email);
        const data = {};
        if (result.length > 0) {
            const randomElement = result[Math.floor(Math.random() * result.length)];
            data.name = randomElement.name + " " + randomElement.lastname,
            data.email = randomElement.email
        }
        res.send(data);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const addFriendToMyList = async (req, res, next) => {
    try {
        const friend = req.body.friend;
        // Get Info from current user
        const db = new DB();
        const CurrentUser = await getCurrentUser('users', {email: req.user.email});
        const moviesCurrentUser = CurrentUser.movies;
        // Search friends with minimum one same movie
        const regex = caseInsensitive(moviesCurrentUser);
        const query = {
            movies: {
                "$in": regex
            }
        }
        const userInfo = await db.getAll('users', query);
        // Return other friends not current user
        const users = userInfo.filter(user => user.email !== CurrentUser.email);
        const found = users.find(user => user.email === friend);
        if (found){
            if (CurrentUser.friends.length > 0) {
                CurrentUser.friends.forEach(async el => {
                    if (el.email === found.email) {
                        return next(Boom.badRequest("No se puede agregar porque ya existe en tu lista de amigos."));
                    } else {
                        const info = await updateFriends(CurrentUser, found, req.user.email);
                        return res.send(info);
                    }
                })
            } else {
                const info = await updateFriends(CurrentUser, found, req.user.email);
                return res.send(info);
            }
        } else {
            next(Boom.badRequest("No se puede agregar a tu lista de amigos, ya que no hay coincidencias de peliculas"));
        }
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const listFriends = async (req, res, next) => {
    try {
        const CurrentUser = await getCurrentUser('users', {email: req.user.email});
        res.send(CurrentUser.friends);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const deleteFriends = async (req, res, next) => {
    try {
        const db = new DB();
        const friendToDelete = ObjectId(req.params.friend);
        const CurrentUser = await getCurrentUser('users', {email: req.user.email});
        const delUser = await getCurrentUser('users', {_id: friendToDelete});
        if (CurrentUser.friends.length > 0) {
            CurrentUser.friends.forEach(function(car, index, object) {
                if(car.email === delUser.email){
                    object.splice(index, 1);
                }
            });
            const where = {
                _id: ObjectId(CurrentUser._id)
            }
            const query = {
                $set: {
                    friends: CurrentUser.friends
                }
            }
            await db.update('users', where, query);
            const info = await db.getAll('users', {email: req.user.email});
            return res.send(info);
        } else {
            next(Boom.badRequest("No existe el usuario"));
        }
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const profileFriend = async (req, res, next) => {
    try {
        const idFriend = req.params.id;
        // Get Current User info
        const CurrentUser = await getCurrentUser('users', {email: req.user.email});
        const FriendsCU = CurrentUser.friends;
        if (FriendsCU.length > 0) {
            const friendProfile = await getCurrentUser('users', {_id: ObjectId(idFriend)});
            let flag = false;
            FriendsCU.forEach(async function(usr, index, object) {
                if(usr.email === friendProfile.email){
                    flag = true;
                }
            });
            if (flag === true) {
                const profile = await getCurrentUser('users', {email: friendProfile.email});
                res.send(profile);
            } else {
                next(Boom.badRequest("No puedes acceder a este perfil, ya que no es tu amigo."));
            }
        }
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

async function getCurrentUser(collection, where) {
    const db = new DB();
    const CurrentUser = await db.getOne(collection, where);
    return CurrentUser;
}

async function updateFriends(CurrentUser, found, email) {
    const db = new DB();
    const where = {
        _id: ObjectId(CurrentUser._id)
    }
    const query = {
        $push: {
            friends: {
                _id: found._id,
                name: found.name,
                email: found.email
            }
        }
    }
    await db.update('users', where, query);
    const info = await getCurrentUser('users', {email: email});
    return info;
}

function caseInsensitive(array) {
    // Make case insensitive
    // return array.map(function (e) { return new RegExp(e, "i"); });
    return array.map(function (e) { return e.toLowerCase(); });
}