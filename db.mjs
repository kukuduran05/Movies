import * as MongoDB from "mongodb";
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb'

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const MONGO_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
class DB {
    constructor(){
        this.client = new MongoDB.MongoClient(MONGO_URI);
        this.db_name = process.env.DB_NAME;
    }

    async connection() {
        if(!DB.connection) {
            try{
                await this.client.connect();
                DB.connection = this.client.db(this.db_name);
            } catch(e){
                return e;
            }
        }
        return DB.connection;
    }

    async getAll(collection, query) {
        const db = await this.connection();
        return db.collection(collection).find(query).toArray();
    }

    async getOne(collection, query) {
        const db = await this.connection();
        return db.collection(collection).findOne(query);
    }

    async create(collection, query) {
        const db = await this.connection();
        return db.collection(collection).insert(query);
    }

    async update(collection, where, query) {
        const db = await this.connection();
        return db.collection(collection).updateOne(where, query);
    }

    async getAllUniques(collection, field) {
        const db = await this.connection();
        return db.collection(collection).distinct(field);
    }

    async delete(collection, query) {
        const db = await this.connection();
        return db.collection(collection).deleteOne(query);
    }
}

export default DB;