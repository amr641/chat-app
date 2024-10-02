"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const userModel_1 = require("../../database/models/userModel");
;
;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userExist = yield userModel_1.User.findOne({ email: req.body.email });
    if (userExist) {
        return res.redirect('/register?error=email is already exist');
    }
    yield userModel_1.User.create(req.body);
    // connectSocket(userExist)
    res.redirect("/chat");
});
exports.signUp = signUp;
// login
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findOne({ email: req.body.email });
    if (!user || req.body.password !== user.password) {
        return res.redirect("/login?error=incorrect email or password ");
    }
    user.status = true;
    yield user.save();
    var hour = 3600000;
    req.session.cookie.expires = new Date(Date.now() + hour);
    req.session.cookie.maxAge = hour;
    req.session.isLoggedIn = true;
    req.session.userName = user.name;
    req.session.userId = user._id;
    res.redirect("/chat");
});
exports.logIn = logIn;
