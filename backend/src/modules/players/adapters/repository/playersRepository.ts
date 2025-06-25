import { col, fn, Op } from "sequelize";
import { PaginatedPlayersResponse } from "../../core/dtos/responses/paginatedPlayersResponse";
import { PlayerForTable } from "../../core/models/playerForTable";
import { playerModel } from "../../core/models/playerModel";
import { PlayerById } from "../../core/models/playerById";
import { EntityNotFoundError } from "../../../../errors/EntityNotFoundError";


export class PlayersRepository{


  static async getPaginatedPlayers (filters:any):Promise<PaginatedPlayersResponse> {
    const where:any={}
    if (filters.longName) where.longName = { [Op.like]: `%${filters.longName}%` };
    if (filters.fifaVersion) where.fifaVersion = { [Op.like]: `${filters.fifaVersion}` };
    if (filters.fifaUpdate ==='true') {
      const maxUpdate = await playerModel.max('fifaUpdate');
      where.fifaUpdate = { [Op.eq]: maxUpdate };
    }
    if (filters.team) where.team = { [Op.like]: `%${filters.team}%` };
    if (filters.positions) where.positions = { [Op.like]: `%${filters.positions}%` };
    
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

    const totalPlayers = await playerModel.count({ where });

    return {
      results: players.map(player=> new PlayerForTable(player)),
      pagination: {
        totalResults: totalPlayers,
        totalPages: Math.ceil(totalPlayers / parsedPageSize),
      },
    };
};

static async getPlayerById(id:number){
  const where:any={}
  where.id= {[Op.eq]: id}

  const player= await playerModel.findOne({
    where
  })

  if(!player) throw new EntityNotFoundError('No se encontro el jugador seleccionado')
    console.log(player)
  console.log(new PlayerById(player.get({plain:true})))
  return new PlayerById(player.get({plain:true}))
}

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

