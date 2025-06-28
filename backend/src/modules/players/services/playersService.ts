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

  static async getPlayerById(id:number){
    return await PlayersRepository.getPlayerById(id)
  }

  static async updatePlayer(playerId:number, newInfo:any){
    return await PlayersRepository.updatePlayer(playerId, newInfo)
  }

  static async getTeams(){
    const teams= await PlayersRepository.getTeams()
    const sortedTeams=teams.sort()
    const noEmptyTeams=sortedTeams.filter((team)=>team!=='')
    return noEmptyTeams
  }

  static async getVersions(){
    return await PlayersRepository.getVersions()
  }

  static async getPositions(){
    const positions:string[]=await PlayersRepository.getPositions()
    
    const allUnified= positions.flatMap((element)=>element.split(",")).map((pos) => pos.trim());
    
    const uniqueTraits = Array.from(new Set(allUnified));
    const sortedPositions =uniqueTraits.sort();
    return sortedPositions
  }

  static async getNationalities(){
    const nationalities=await PlayersRepository.getNationalities()
    const sortedNationalities=nationalities.sort()
    return sortedNationalities
  }
  static async getPreferredFoot(){
    return await PlayersRepository.getPreferredFoot()

  }

  static async getTraits(){
    const traits:string[]=await PlayersRepository.getTraits()

    const allUnified= traits.flatMap((element)=>element.split(", ")).map((pos) => pos.trim());

    const uniqueTraits = Array.from(new Set(allUnified));

    const sortedTraits= uniqueTraits.sort()
    return sortedTraits;
  }

  static async getBodyType(){
    const bodyTypes:string[]=await PlayersRepository.getBodyTypes()
    
    const allUnified=  bodyTypes.flatMap((element)=>element.split(",")).map((pos) => pos.trim());

    const sortedBodyTypes= allUnified.sort()
    
    return sortedBodyTypes
  }

};
