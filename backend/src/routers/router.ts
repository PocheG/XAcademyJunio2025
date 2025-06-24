import { Router } from "express";
import playersRouter from "../modules/players/PlayersRouter";


const appRouter= Router()

appRouter.use('/players', playersRouter);  

export default appRouter
 