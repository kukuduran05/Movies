import DB from '../db.mjs';
import dotenv from 'dotenv';
import { match } from '../utils/hashing.mjs';
import Boom from '@hapi/boom';
import Jwt from "jsonwebtoken";

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

export const login = async (req, res, next ) => {
    try {
        const { email, password} = req.body;
        const db = new DB();
        const user = await db.getOne('users', {"email": email})
        if (user) {
            let isPasswordMatching = await match(password, user.pass);
            if(isPasswordMatching === true) {
                // Create Token
                let secret = process.env.TOKEN_SECRET;
                const token = Jwt.sign({
                    id: user._id,
                    email: user.email
                }, secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                })

                return res.json({
                    id: user._id, user: email, token
                });
            }
        }
        const info = {
            msg: 'User not found!'
        }
        return res.send(info);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}