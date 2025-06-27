import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../../services/playersService";
import { plainToClass, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestError } from "../../../../errors/BadRequestError";
import { UpdatePlayerValidations } from "../../core/validations/updatePlayerValidations";

export class PlayersController{
    static async getPaginatedPlayers(req:Request,res:Response,next:NextFunction){
        try{
            const filters=req.query
            const players=await PlayerService.getPaginatedPlayers(filters)
            res.status(200).send(players)
        }catch(error){
            next(error)
        }
    }
    static async getPlayersCSV(req:Request,res:Response,next:NextFunction){
        try{
            const filters=req.query
            const players=await PlayerService.getPlayersCSV(filters)

            res.setHeader('Content-Disposition', 'attachment; filename="usuarios.xlsx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            
            res.status(200).send(players)
        }catch(error){
            next(error)
        }
    }

    static async getPlayerById(req:Request,res:Response,next:NextFunction){
        try{
            const id= req.params.id
            if(!id || isNaN(Number(id))){
                throw new BadRequestError("La variable id del path debe ser un número y es requerida")
                return
            }

            const player= await PlayerService.getPlayerById(Number(id))

            res.status(200).send(player)
        }catch(error){
            next(error)
        }

    }

    static async updatePlayer(req:Request,res:Response,next:NextFunction){
        try{
            const id= req.params.id
            if(!id || isNaN(Number(id))){
                throw new BadRequestError("La variable id del path debe ser un número y es requerida")

            }
            
            const newInfo= plainToInstance( UpdatePlayerValidations, req.body)

            const errors= await validate(newInfo)
            
            if(errors.length){
                const firstConstraint = Object.values(errors[0].constraints || {})[0];
                throw new BadRequestError(firstConstraint)
            }
            const player= await PlayerService.updatePlayer(Number(id),newInfo)

            res.status(200).send(player)
        }catch(error){
            next(error)
        }

    }

    static async getTeams(req:Request,res:Response,next:NextFunction){
        try{
            const teams= await PlayerService.getTeams()
            res.status(200).send(teams)
        }catch(error){
            next(error)
        }

    }
    static async getVersions(req:Request,res:Response,next:NextFunction){
        try{
            const versions= await PlayerService.getVersions()
            res.status(200).send(versions)
        }catch(error){
            next(error)
        }
    }
    static async getPositions(req:Request,res:Response,next:NextFunction){
        try{
            const positions= await PlayerService.getPositions()
            res.status(200).send(positions)
        }catch(error){
            next(error)
        }
    }
  
}
