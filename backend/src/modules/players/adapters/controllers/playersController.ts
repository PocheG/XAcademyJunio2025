import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../../services/playersService";
import { plainToClass } from "class-transformer";
import { PaginatedPlayerFilters } from "../../core/validations/playersFiltersValidations";
import { validate } from "class-validator";
import { BadRequestError } from "../../../../errors/BadRequestError";
import { exportCSV } from "../../../../utilities/csvUtility";

export class PlayersController{
    static async getPaginatedPlayers(req:Request,res:Response,next:NextFunction){
        try{
            const requestQuery= plainToClass(PaginatedPlayerFilters, req.query)
            const requestErrors= await validate(requestQuery)
            if(requestErrors.length>0){
                //retorna solo el primer error para no hacer un mensaje tan largo
                const message:string= Object.values(requestErrors[0].constraints!)[0]
                throw new BadRequestError(JSON.stringify(message))
            }

            const filters=req.query
            const players=await PlayerService.getPaginatedPlayers(filters)
            console.log(players)
            res.status(200).send(players)
        }catch(error){
            next(error)
        }
    }
    static async getPlayersCSV(req:Request,res:Response,next:NextFunction){
        try{
            const requestQuery= plainToClass(PaginatedPlayerFilters, req.query)
            const requestErrors= await validate(requestQuery)

            if(requestErrors.length>0){
                //retorna solo el primer error para no hacer un mensaje tan largo
                const message:string= Object.values(requestErrors[0].constraints!)[0]
                throw new BadRequestError(JSON.stringify(message))
            }
            const filters=req.query
            const players=await PlayerService.getPlayersCSV(filters)

            res.setHeader('Content-Disposition', 'attachment; filename="usuarios.xlsx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            
            res.status(200).send(players)
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
