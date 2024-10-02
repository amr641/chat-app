import { Router } from "express";
import { logIn, signUp } from "./user.controller";

export const userRouter = Router();
userRouter.post("/register", signUp).post("/login",logIn);
