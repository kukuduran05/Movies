import express from "express";
//TODO schemas movies validations
import * as Movies from "../controllers/movies.controller.mjs";
export const movieRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Movies:
 *          type: object
 *          properties:
 *              movies:
 *                  type: array
 *                  description: The favorite movies, minimum one, maximum two
 *          example:
 *              movies: [Fast and Furious]
 */

/**
 * @swagger
 * /movies:
 *  get:
 *      summary: List of unique movies
 *      tags:
 *          - Movies
 *      description: "Get list of movies"
 *      operationId: getMovies
 *      parameters: []
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The movies list is appear
 *          500:
 *              description: Some server error
 */
// Get Movies (without repeat duplicates)
movieRouter.get('/', Movies.getAllUniques)


/**
 * @swagger
 * /movies/{userId}:
 *  put:
 *      summary: Update the movies by userId
 *      tags: 
 *          - Movies
 *      description: ""
 *      operationId: updateMovies
 *      parameters:
 *          - $ref: "#/components/parameters/userId"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Movies"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The movie was updated
 *          500:
 *              description: Some server error
 *          404:
 *              description: The movie was not found
 *      
 */
// Update Movies
movieRouter.put("/:id", Movies.updateMovies);