import express from "express";
//TODO schemas user validations
import * as Users from "../controllers/users.controller.mjs";
import { validationHandler } from "../middleware/validationHandler.mjs";
import { createUserSchema } from '../utils/schemes/users.mjs';
import { verifyToken } from '../middleware/validateToken.mjs';

export const userRouter = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      token:
 *          type: apiKey
 *          in: header
 *          name: auth-token
 *  parameters:
 *      userId:
 *          in: path
 *          name: userId
 *          required: true
 *          schema:
 *              type: string
 *          description: The user Id
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              userId:
 *                  type: integer
 *                  description: The auto-generated id of user
 *              name:
 *                  type: string
 *                  description: The name of the user
 *              lastname:
 *                  type: string
 *                  description: The lastname of the user
 *              email:
 *                  type: string
 *                  description: The email of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *              movies:
 *                  type: array
 *                  description: The favorite movies, minimum one, maximum two
 *          example:
 *              name: karla
 *              lastname: solis
 *              email: karla.solis@hotmail.com
 *              password: secret
 *              movies: [Batman, Spiderman]
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: List of users
 *      tags:
 *          - Users
 *      description: "Get list of users"
 *      operationId: getUsers
 *      parameters: []
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The users list is appear
 *          500:
 *              description: Some server error
 */

// Get users
userRouter.get("/", verifyToken, Users.getUsers);

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Create user
 *      tags: 
 *          - Users
 *      description: "Create new user account."
 *      operationId: createUser
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The User was created successfully
 *          500:
 *              description: Some server error
 */
// New user
userRouter.post("/", validationHandler(createUserSchema), Users.createUser);

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *      summary: Delete user
 *      tags: 
 *          - Users
 *      description: ""
 *      operationId: deleteUser
 *      parameters:
 *          - $ref: "#/components/parameters/userId"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The user was deleted
 *          404:
 *              description: The user was not found
 */
// Delete User
userRouter.delete("/:id", verifyToken, Users.deleteUser);