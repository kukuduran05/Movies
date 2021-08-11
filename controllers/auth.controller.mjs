import AuthService from '../services/auth.mjs';
import Boom from '@hapi/boom';

const auth = new AuthService();

export const login = async (req, res, next ) => {
    try {
        const { email, password} = req.body;
        const user = await auth.login( { email, password });
        res.send(user);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}