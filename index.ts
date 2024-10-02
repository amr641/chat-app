import express, { NextFunction, Request, Response } from "express";

import path from "path";
import { Server } from "socket.io";
import { bootstrab } from "./modules/bootstrab";
import { dbConn } from "./database/dbConn";
import session, { Store } from "express-session";
// import mongoSession from 'connect-mongodb-session'
import MongoStore from "connect-mongo";
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
// session
export let sessionMiddleWare = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/chat-app", // MongoDB connection string
    collectionName: "mySessions", // Collection where sessions are stored
    ttl: 14 * 24 * 60 * 60, // Set TTL (Time to live) for sessions in seconds (14 days here)
  }),
});
app.use(sessionMiddleWare);
bootstrab(app);
dbConn();
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve register, login, and chat pages
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

let server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
