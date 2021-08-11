import UserService from '../services/users.mjs';
import Boom from '@hapi/boom';

const user = new UserService();

export const getUsers = async (req, res, next ) => {
    try {
        const users = await user.getUsers();
        return res.send(users);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const createUser = async (req, res, next ) => {
    try {
        const {name, lastname, password, email, movies} = req.body;
        const newUser = await user.saveUser({name, lastname, password, email, movies});
        return res.send(newUser);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const idUser = req.params.id;
        const dltUsr = await user.removeUser({idUser});
        if (dltUsr.deletedCount !== 0) {
            res.send({msg: "User Deleted!"});
        }
    } catch (e) {
        next(Boom.badRequest(e.message));
    }
}