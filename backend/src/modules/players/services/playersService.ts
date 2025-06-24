import { exportCSV } from "../../../utilities/csvUtility";
import { PlayersRepository } from "../adapters/repository/playersRepository";
import { PaginatedPlayersResponse } from "../core/dtos/responses/paginatedPlayersResponse";

export class PlayerService{
  static async getPaginatedPlayers(filters:any):Promise<PaginatedPlayersResponse>{
    return PlayersRepository.getPaginatedPlayers(filters)
  }
  static async getPlayersCSV(filters:any):Promise<Buffer>{
    const players:PaginatedPlayersResponse=await PlayersRepository.getPaginatedPlayers(filters)
    const playerSCV= exportCSV(players.results, "Jugadores")
    return playerSCV

  }

  static async getTeams(){
    return await PlayersRepository.getTeams()
  }

  static async getVersions(){
    return await PlayersRepository.getVersions()
  }

  static async getPositions(){
    const positions:string[]=await PlayersRepository.getPositions()
    //crea un array de string con 1 valor por posicion, eliminando espacios adicionales
    const allUnified= positions.flatMap((element)=>element.split(",")).map((pos) => pos.trim());
    
    //crea un array de unicos
    const uniquePositions = [...new Set(allUnified)];
    return uniquePositions
  }

};
