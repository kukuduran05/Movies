import express from "express";
//TODO schemas movies validations
import * as Movies from "../controllers/movies.controller.mjs";
export const movieRouter = express.Router();

// Get Movies (without repeat duplicates)
movieRouter.get('/', Movies.getAllUniques)

// Update Movies
movieRouter.put("/:id", Movies.updateMovies);