"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        max: 30,
        min: 3,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
