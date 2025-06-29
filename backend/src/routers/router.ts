import { Router } from "express";
import playersRouter from "../modules/players/PlayersRouter";
import userRouter from "../modules/auth/UserRouter";


const appRouter= Router()

appRouter.use('/players', playersRouter); 
appRouter.use('/auth', userRouter) 

export default appRouter
 