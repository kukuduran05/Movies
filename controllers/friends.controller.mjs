import FriendService from '../services/friends.mjs';
import Boom from '@hapi/boom';
import { ObjectId } from 'mongodb';

const friend = new FriendService();

export const sugested = async (req, res, next) => {
    try {
        const suggestedFriends = await friend.suggestedFriends(req.user.email);
        res.send(suggestedFriends);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const addFriendToMyList = async (req, res, next) => {
    try {
        const newfriend = req.body.friend;
        const results = await friend.addFriend(newfriend, req.user.email);
        if (results !== undefined) {
            res.send(results);
        } else {
            next(Boom.badRequest("The user exist in your friend list!"));
        }
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const listFriends = async (req, res, next) => {
    try {
        const CurrentUser = await friend.getFriends(req.user.email);
        res.send(CurrentUser);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const deleteFriends = async (req, res, next) => {
    try {
        const friendToDelete = ObjectId(req.params.friend);
        const result = await friend.deleteFriends(friendToDelete, req.user.email);
        res.send(result);
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}

export const profileFriend = async (req, res, next) => {
    try {
        const idFriend = req.params.id;
        const profile = await friend.profileFriend(idFriend, req.user.email);
        res.send(profile);   
    } catch(e) {
        next(Boom.badRequest(e.message));
    }
}