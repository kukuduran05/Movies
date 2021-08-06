import Jwt from "jsonwebtoken";
import Boom from "@hapi/boom";

//middleware to validate token (protected routes)
export const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    const secret = process.env.TOKEN_SECRET;
    if (!token) return next(Boom.badRequest('Acceso denegado'));
    try {
        const verified = Jwt.verify(token, secret)
        req.user = verified
        next() // continue
    } catch (error) {
        next(Boom.badRequest('token no es válido'));
    }
}