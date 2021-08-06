import express from "express";
//TODO schemas movies validations
import * as Friends from "../controllers/friends.controller.mjs";
export const friendRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Friend:
 *          type: object
 *          properties:
 *              friend:
 *                  type: string
 *                  description: The email of the user
 *          example:
 *              friend: juan@encora.com
 *  parameters:
 *      idProfileFriend:
 *          in: path
 *          name: idProfileFriend
 *          required: true
 *          schema:
 *              type: string
 *          description: The Profile Friend Id
 */

/**
 * @swagger
 * /friends:
 *  get:
 *      summary: List of friends
 *      tags:
 *          - Friends
 *      description: "Get list of friends"
 *      operationId: getFriends
 *      parameters: []
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The friends list is appear
 *          500:
 *              description: Some server error
 */
// Get Friends
friendRouter.get('/', Friends.listFriends)

/**
 * @swagger
 * /friends/add-friend:
 *  post:
 *      summary: Add friend to my list
 *      tags: 
 *          - Friends
 *      description: "Add new user to my friend list."
 *      operationId: newFriend
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Friend'
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The User was added successfully to my list friends
 *          500:
 *              description: Some server error
 */
// Add Friend
friendRouter.post("/add-friend", Friends.addFriendToMyList);

/**
 * @swagger
 * /friends/sugested-friend:
 *  get:
 *      summary: List of suggested friends
 *      tags:
 *          - Friends
 *      description: "Get list of suggested friends"
 *      operationId: getFriendsSuggested
 *      parameters: []
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The suggested friends list is appear
 *          500:
 *              description: Some server error
 */
// Get Suggested friend
friendRouter.get("/sugested-friend", Friends.sugested);

/**
 * @swagger
 * /friends/{idProfileFriend}:
 *  delete:
 *      summary: Delete friend from my list
 *      tags: 
 *          - Friends
 *      description: ""
 *      operationId: deleteFriend
 *      parameters:
 *          - $ref: "#/components/parameters/idProfileFriend"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The friend was deleted from my list
 *          404:
 *              description: The friend was not found in my list
 */
// Delete friend
friendRouter.delete("/:friend", Friends.deleteFriends);

/**
 * @swagger
 * /friends/{idProfileFriend}:
 *  get:
 *      summary: Get Profile Friend
 *      tags:
 *          - Friends
 *      description: "Get profile friend"
 *      operationId: getProfile
 *      parameters:
 *          - $ref: "#/components/parameters/idProfileFriend"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The profile friend is appear
 *          500:
 *              description: Some server error
 */
// Profile friend
friendRouter.get("/:id", Friends.profileFriend);