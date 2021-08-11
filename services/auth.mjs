import DB from '../db.mjs';
import dotenv from 'dotenv';
import { match } from '../utils/hashing.mjs';
import Jwt from "jsonwebtoken";

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

class AuthService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new DB();
    }

    async login({ email, password }) {
        const user = await this.mongoDB.getAll(this.collection, {"email": email});
        if (user.length !== 0) {
            let isPasswordMatching = await match(password, user[0].pass);
            if(isPasswordMatching === true) {
                // Create Token
                let secret = process.env.TOKEN_SECRET;
                const token = Jwt.sign({
                    id: user[0]._id,
                    email: user[0].email
                }, secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                })
                const info = {
                    id: user[0]._id,
                    user: user[0].email,
                    token
                }
                return info;
            } else {
                return { msg: 'Password Incorrect!'}
            }
        }
        const info = {
            msg: 'User not found!'
        }
        return info;
    }
}

export default AuthService;