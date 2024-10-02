import { Request, Response } from "express";
import path from "path";
import { Socket } from "socket.io";
import { io, sessionMiddleWare } from "../..";
import { SessionSocket } from "../user/user.controller";

export const openChatConnection = (req: Request, res: Response) => {
  // Check if the user is logged in
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }

  // Serve the chat HTML file
  const chatFilePath = path.join(__dirname, "../../public/chat.html");
  res.sendFile(chatFilePath);

  // Use shared session middleware for Socket.IO connections
  io.engine.use(sessionMiddleWare);
  
  // Set up Socket.IO connection
  io.on("connection", (defaultSocket: Socket) => {
    const socket = <SessionSocket>defaultSocket;
    const session = socket.request.session; // Use specific type for session

    console.log(`User connected: ${session.userName}`);

    // Handle incoming messages
    socket.on("sendMessage", (msg: string) => {
      // Broadcast message to all other users
      socket.broadcast.emit("reply", `from ${session.userName}: ${msg}`);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`${session.userName} disconnected`);
    });
  });
};
