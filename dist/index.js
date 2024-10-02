"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.sessionMiddleWare = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const bootstrab_1 = require("./modules/bootstrab");
const dbConn_1 = require("./database/dbConn");
const express_session_1 = __importDefault(require("express-session"));
// import mongoSession from 'connect-mongodb-session'
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.urlencoded({ extended: true }));
// session
exports.sessionMiddleWare = (0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb://localhost:27017/chat-app", // MongoDB connection string
        collectionName: "mySessions", // Collection where sessions are stored
        ttl: 14 * 24 * 60 * 60, // Set TTL (Time to live) for sessions in seconds (14 days here)
    }),
});
app.use(exports.sessionMiddleWare);
(0, bootstrab_1.bootstrab)(app);
(0, dbConn_1.dbConn)();
// Serve static files from the "public" folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Endpoint to serve register, login, and chat pages
app.get("/register", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "register.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "login.html"));
});
let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
