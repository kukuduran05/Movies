import express from "express";
//TODO schemas user validations
import * as Users from "../controllers/users.controller.mjs";
import { validationHandler } from "../middleware/validationHandler.mjs";
import { createUserSchema } from '../utils/schemes/users.mjs';
import { verifyToken } from '../middleware/validateToken.mjs';

export const userRouter = express.Router();

// Get users
userRouter.get("/", verifyToken, Users.getUsers);

// New user
userRouter.post("/", validationHandler(createUserSchema), Users.createUser);

// Delete User
userRouter.delete("/:id", verifyToken, Users.deleteUser);