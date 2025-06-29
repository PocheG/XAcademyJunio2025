import { Router } from "express";
import playersRouter from "../modules/players/PlayersRouter";
import userRouter from "../modules/auth/UserRouter";
import { authMiddleware } from "../middleware/authMiddleware";


const appRouter= Router()

appRouter.use('/players', authMiddleware,playersRouter); 
appRouter.use('/auth', userRouter) 

export default appRouter
 