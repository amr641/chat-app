"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrab = void 0;
const chat_routes_1 = require("./chat/chat.routes");
const user_routes_1 = require("./user/user.routes");
const bootstrab = function (app) {
    app.use(user_routes_1.userRouter);
    app.use(chat_routes_1.chatRouter);
};
exports.bootstrab = bootstrab;
