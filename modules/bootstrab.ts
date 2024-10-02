import { chatRouter } from "./chat/chat.routes"
import { userRouter } from "./user/user.routes"

export const bootstrab =function(app:any){
    app.use(userRouter)
    app.use(chatRouter)
}