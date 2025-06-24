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


};
