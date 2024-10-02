import { NextFunction, Request, Response } from "express";
import { User } from "../../database/models/userModel";
import { Types } from "mongoose";
import { IncomingMessage } from "http";
import { Socket } from "socket.io";
import { Session } from "express-session";

// import { Session } from "express-session";
// custom properties in session object
declare module 'express-session' {
 export  interface Session {
    userId?: Types.ObjectId;
    isLoggedIn?: boolean;
    userName:string | null | undefined
    // Add any custom properties you want to store in the session
  }
}
interface SessionIncomingMessage extends IncomingMessage {
  session: Session
};

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage
};

export const signUp = async (req: Request, res: Response) => {

  let userExist = await User.findOne({email:req.body.email})
    if(userExist){ 
          return res.redirect('/register?error=email is already exist')
    }
await User.create(req.body)
  // connectSocket(userExist)
  res.redirect("/chat");
};
// login
export const logIn = async (req:Request, res:Response, next:NextFunction) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || req.body.password !== user.password) {
    return res.redirect("/login?error=incorrect email or password ");
  }
  user.status = true;
  await user.save();
  var hour = 3600000;
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;
  req.session.isLoggedIn = true;
  req.session.userName = user.name;
  req.session.userId = user._id;
res.redirect("/chat")
};
