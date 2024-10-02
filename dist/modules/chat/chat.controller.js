"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openChatConnection = void 0;
const path_1 = __importDefault(require("path"));
const __1 = require("../..");
const openChatConnection = (req, res) => {
    // Check if the user is logged in
    if (!req.session.isLoggedIn) {
        return res.redirect("/login");
    }
    // Serve the chat HTML file
    const chatFilePath = path_1.default.join(__dirname, "../../public/chat.html");
    res.sendFile(chatFilePath);
    // Use shared session middleware for Socket.IO connections
    __1.io.engine.use(__1.sessionMiddleWare);
    // Set up Socket.IO connection
    __1.io.on("connection", (defaultSocket) => {
        const socket = defaultSocket;
        const session = socket.request.session; // Use specific type for session
        console.log(`User connected: ${session.userName}`);
        // Handle incoming messages
        socket.on("sendMessage", (msg) => {
            // Broadcast message to all other users
            socket.broadcast.emit("reply", `from ${session.userName}: ${msg}`);
        });
        // Handle user disconnection
        socket.on("disconnect", () => {
            console.log(`${session.userName} disconnected`);
        });
    });
};
exports.openChatConnection = openChatConnection;
