import { col, fn, Op } from "sequelize";
import { PaginatedPlayersResponse } from "../../core/dtos/responses/paginatedPlayersResponse";
import { PlayerForTable } from "../../core/models/playerForTable";
import { playerModel } from "../../core/models/playerModel";


export class PlayersRepository{


  static async getPaginatedPlayers (filters:any):Promise<PaginatedPlayersResponse> {
    const where:any={}

    if (filters.fullName) where.longName = { [Op.like]: `%${filters.fullName}%` };
    if (filters.fifaVersion) where.fifaVersion = { [Op.iLike]: `${filters.fifaVersion}` };
    if (filters.fifaUpdate) where.fifaUpdate = { [Op.eq]: filters.fifaUpdate };
    if (filters.team) where.team = { [Op.iLike]: `%${filters.team}%` };
    if (filters.positions) where.positions = { [Op.iLike]: `%${filters.positions}%` };
    
    if (filters.minOverall) where.overall = { [Op.gte]: parseInt(filters.minOverall, 10) };
    if (filters.minPace) where.pace = { [Op.gte]: parseInt(filters.minPace, 10) };
    if (filters.minShooting) where.shooting = { [Op.gte]: parseInt(filters.minShooting, 10) };
    if (filters.minPassing) where.passing = { [Op.gte]: parseInt(filters.minPassing, 10) };
    if (filters.minDribbling) where.dribbling = { [Op.gte]: parseInt(filters.minDribbling, 10) };
    if (filters.minDefending) where.defending = { [Op.gte]: parseInt(filters.minDefending, 10) };
    if (filters.minPhysic) where.physic = { [Op.gte]: parseInt(filters.minPhysic, 10) };

    const parsedPage=parseInt(filters.page,10)||1
    const parsedPageSize=parseInt(filters.pageSize,10)||10
    const offset = parsedPage===1?1:(parsedPage - 1) * parsedPageSize;
    const orderBy = filters.orderBy || 'id';
    const orderDirection = filters.orderDirection?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const players = await playerModel.findAll({
      where,
      limit: parsedPageSize,
      offset,
      order: [[orderBy, orderDirection]],
    });

    const totalPlayers = await playerModel.count();

    return {
      results: players.map(player=> new PlayerForTable(player)),
      pagination: {
        totalResults: totalPlayers,
        totalPages: Math.ceil(totalPlayers / parsedPageSize),
      },
    };
};
static async getTeams(){
  const uniqueTeams:any[] = await playerModel.findAll({
    attributes: ['team'],
    group: ['team'],
    raw: true,
  });
  
 
  const stringArray: string[] = uniqueTeams.map((element) => element.team);
  return stringArray;
  
}
static async getVersions(){
  const uniqueVersions:any[] = await playerModel.findAll({
    attributes: ['fifaVersion'],
    group: ['fifaVersion'],
    raw: true,
  });
 
  const stringArray: string[] = uniqueVersions.map((element) => element.fifaVersion);
  return stringArray;
  
}
static async getPositions(){
  const uniquePositions:any[] = await playerModel.findAll({
    attributes: ['positions'],
    group: ['positions'],
    raw: true,
  });
  
  const stringArray: string[] = uniquePositions.map((element) => element.positions);
  return stringArray;
  
}


}

