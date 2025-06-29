import { NextFunction, Request, Response } from "express"
import { UserService } from "../../service/UserService"
import { BadRequestError } from "../../../../errors/BadRequestError"
import { jwtService } from "../../service/jswService"

export class userController{
    static async login(req:Request,res:Response,next:NextFunction){
        try{
            const {userName, password}= req.body

            if(!userName){
                throw new BadRequestError('El parametro userName es requerido')
            }
            if(!password){
                throw new BadRequestError('El parametro password es requerido')
            }

            const userExsist= await UserService.login(userName,password)

            const token= jwtService.sign({userExsist})

            res.status(200).send(token)
        }catch(error){
            next(error)
        }
    }
}