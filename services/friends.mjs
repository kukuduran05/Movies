import DB from '../db.mjs';
import { ObjectId } from 'mongodb';

class FriendService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new DB();
    }

    async getFriends(email) {
        const CurrentUser = await this.getCurrentUser(this.collection, {email: email});
        return CurrentUser.friends;
    }

    async suggestedFriends(email) {
        // Get Info from current user
        const CurrentUser = await this.getCurrentUser(this.collection, {email: email});
        const moviesCurrentUser = CurrentUser.movies;
        // Search friends with minimum one same movie
        const regex = this.caseInsensitive(moviesCurrentUser);
        const query = {
            movies: regex
        }
        const userInfo = await this.mongoDB.getAll(this.collection, query);
        // Return other friends not current user
        const result = userInfo.filter(user => user.email !== CurrentUser.email);
        const data = {};
        if (result.length > 0) {
            const randomElement = result[Math.floor(Math.random() * result.length)];
            data.name = randomElement.name + " " + randomElement.lastname,
            data.email = randomElement.email
        }
        return data;
    }

    async addFriend(newFriend, email) {
        // Get Info from current user
        const CurrentUser = await this.getCurrentUser(this.collection, {email: email});
        const moviesCurrentUser = CurrentUser.movies;
        // Search friends with minimum one same movie
        const regex = this.caseInsensitive(moviesCurrentUser);
        const query = {
            movies: {
                "$in": regex
            }
        }
        const userInfo = await this.mongoDB.getAll(this.collection, query);
        // Return other friends not current user
        const users = userInfo.filter(user => user.email !== CurrentUser.email);
        const found = users.find(user => user.email === newFriend);
        if (found){
            if (CurrentUser.friends.length > 0) {
                CurrentUser.friends.forEach(async el => {
                    if (el.email !== found.email) {
                        const info = await this.updateFriends(CurrentUser, found, email);
                        return info;
                    }
                })
            } else {
                const info = await this.updateFriends(CurrentUser, found, email);
                return info;
            }
        } else {
            return { msg: "Cannot be added to your friends list, as there are no movie matches."};
        }
    }

    async deleteFriends(friendToDelete, email) {
        const CurrentUser = await this.getCurrentUser(this.collection, {email: email});
        const delUser = await this.getCurrentUser(this.collection, {_id: friendToDelete});
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
            await this.mongoDB.update(this.collection, where, query);
            const info = await this.mongoDB.getAll(this.collection, {email: email});
            return info;
        } else {
            return "User not found";
        }
    }

    async profileFriend(idFriend, email) {
        // Get Current User info
        const CurrentUser = await this.getCurrentUser(this.collection, {email: email});
        const FriendsCU = CurrentUser.friends;
        if (FriendsCU.length > 0) {
            const friendProfile = await this.getCurrentUser(this.collection, {_id: ObjectId(idFriend)});
            let flag = false;
            FriendsCU.forEach(async function(usr, index, object) {
                if(usr.email === friendProfile.email){
                    flag = true;
                }
            });
            if (flag === true) {
                const profile = await this.getCurrentUser(this.collection, {email: friendProfile.email});
                return profile;
            } else {
                return "You cannot access this profile as it is not your friend.";
            }
        }
    }

    async getCurrentUser(collection, where) {
        return await this.mongoDB.getOne(collection, where);
    }

    caseInsensitive(array) {
        return array.map(function (e) { return e.toLowerCase(); });
    }

    async updateFriends(CurrentUser, found, email) {
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
        await this.mongoDB.update(this.collection, where, query);
        const info = await this.getCurrentUser(this.collection, {email: email});
        return info;
    }
}

export default FriendService;