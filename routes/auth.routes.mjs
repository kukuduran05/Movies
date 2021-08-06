import express from "express";
//TODO schemas user validations
import * as Auth from "../controllers/auth.controller.mjs";

export const authRouter = express.Router();

// Login
authRouter.post("/login", Auth.login);