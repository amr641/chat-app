import { connect } from "mongoose";

export const dbConn=  ( ):void => {
    connect("mongodb://localhost:27017/chat-app")
    .then(()=>{
    console.log('DB connected');
}).catch(()=>{
    console.log('Err DB Connection');
})
}