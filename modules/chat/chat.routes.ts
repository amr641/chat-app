import { Router } from "express";
import { openChatConnection } from "./chat.controller";

export const chatRouter =Router()
chatRouter.get("/chat",openChatConnection)
