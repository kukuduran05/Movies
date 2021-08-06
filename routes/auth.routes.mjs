import express from "express";
//TODO schemas user validations
import * as Auth from "../controllers/auth.controller.mjs";

export const authRouter = express.Router();

/**
 * @swagger
 * schemes:
 * - http
 * description: Endpoints for authentication
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: The email for login
 *              password:
 *                  type: string
 *                  description: The password for login in clear text
 *          example:
 *              email: karla@encora.com
 *              password: "12345"         
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Logs user into the system
 *      tags: 
 *          - Auth
 *      description: ""
 *      operationId: loginUser
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: The Login was successfully, was generated the access token
 *          500:
 *              description: Some server error
 */
// Login
authRouter.post("/login", Auth.login);