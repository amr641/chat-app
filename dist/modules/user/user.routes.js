"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/register", user_controller_1.signUp).post("/login", user_controller_1.logIn);
