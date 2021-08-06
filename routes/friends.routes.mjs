import express from "express";
//TODO schemas movies validations
import * as Friends from "../controllers/friends.controller.mjs";
export const friendRouter = express.Router();

// Get Friends
friendRouter.get('/', Friends.listFriends)

// Add Friend
friendRouter.post("/add-friend", Friends.addFriendToMyList);

// Get Suggested friend
friendRouter.get("/sugested-friend", Friends.sugested);

// // Delete friend
friendRouter.delete("/:friend", Friends.deleteFriends);

// Profile friend
friendRouter.get("/:id", Friends.profileFriend);