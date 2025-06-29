import { col, fn, Op } from "sequelize";
import { PaginatedPlayersResponse } from "../../core/dtos/responses/paginatedPlayersResponse";
import { PlayerForTable } from "../../core/models/playerForTable";
import { playerModel } from "../../core/models/playerModel";
import { PlayerById } from "../../core/models/playerById";
import { EntityNotFoundError } from "../../../../errors/EntityNotFoundError";


export class PlayersRepository{


  static async getPaginatedPlayers (filters:any):Promise<PaginatedPlayersResponse> {
    const where:any={}
    if (filters.longName) where.longName = { [Op.iLike]: `%${filters.longName}%` };
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
  new PlayerById(player.get({plain:true}))
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

static async updatePlayer(playerId:number, newInfo:any){ 
  const newOverall:number=(newInfo.pace+newInfo.shooting+newInfo.passing+newInfo.dribbling+newInfo.physic+newInfo.defending)/6
  await playerModel.update({
    fifaVersion:newInfo.fifaVersion,
    playerFaceUrl:newInfo.playerFaceUrl,
    longName: newInfo.longName,
    team:newInfo.team,
    positions:newInfo.positions,
    reputation: newInfo.reputation,
    age:newInfo.age,
    heightCm:newInfo.heightCm,
    weightKg:newInfo.weightKg,
    nationality:newInfo.nationality,
    preferredFoot:newInfo.preferredFoot,
    bodyType:newInfo.bodyType,
    traits:newInfo.traits,
    overall:parseInt(newOverall.toString()),
    pace:newInfo.pace,
    shooting:newInfo.shooting,
    passing:newInfo.passing,
    dribbling:newInfo.dribbling,
    physic: newInfo.physic,
    defending: newInfo.defending,
    attackingCrossing:newInfo.attackingCrossing, 
    attackingFinishing:newInfo.attackingFinishing,
    attackingHeadingAccuracy: newInfo.attackingHeadingAccuracy,
    attackingShortPassing:newInfo.attackingShortPassing,
    attackingVolleys: newInfo.attackingVolleys
  },{
    where: {id:playerId}
  }
    
  )
}

static async insertNewPlayer(newInfo:any){
    const newOverall:number=(newInfo.pace+newInfo.shooting+newInfo.passing+newInfo.dribbling+newInfo.physic+newInfo.defending)/6
    const newPlayerId=await playerModel.create({
      fifaVersion:newInfo.fifaVersion,
      playerFaceUrl:newInfo.playerFaceUrl,
      fifaUpdate:1,
      longName: newInfo.longName,
      team:newInfo.team,
      positions:newInfo.positions,
      potentiaL:99,
      reputation: newInfo.reputation,
      age:newInfo.age,
      heightCm:newInfo.heightCm,
      weightKg:newInfo.weightKg,
      nationality:newInfo.nationality,
      preferredFoot:newInfo.preferredFoot,
      bodyType:newInfo.bodyType,
      traits:newInfo.traits,
      overall:parseInt(newOverall.toString()),
      pace:newInfo.pace,
      shooting:newInfo.shooting,
      passing:newInfo.passing,
      dribbling:newInfo.dribbling,
      physic: newInfo.physic,
      defending: newInfo.defending,
      attackingCrossing:newInfo.attackingCrossing, 
      attackingFinishing:newInfo.attackingFinishing,
      attackingHeadingAccuracy: newInfo.attackingHeadingAccuracy,
      attackingShortPassing:newInfo.attackingShortPassing,
      attackingVolleys: newInfo.attackingVolleys
    })
    return new PlayerById(newPlayerId).id
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

static async getPreferredFoot(){
  const uniqueFoots:any[] = await playerModel.findAll({
    attributes: ['preferredFoot'],
    group: ['preferredFoot'],
    raw: true,
  });
  
  const stringArray: string[] = uniqueFoots.map((element) => element.preferredFoot);
  return stringArray;
  
}   
static async getNationalities(){
  const uniqueNationalities:any[] = await playerModel.findAll({
    attributes: ['nationality'],
    group: ['nationality'],
    raw: true,
  });
  
  const stringArray: string[] = uniqueNationalities.map((element) => element.nationality);
  return stringArray;
  
}   

static async getTraits(){
  const uniqueTraits:any[] = await playerModel.findAll({
    attributes: ['traits'],
    group: ['traits'],
    raw: true,
  });
  
  const stringArray: string[] = uniqueTraits.map((element) => element.traits);
  return stringArray;
  
}   
static async getBodyTypes(){
  const uniqueBodyType:any[] = await playerModel.findAll({
    attributes: ['bodyType'],
    group: ['bodyType'],
    raw: true,
  });
  
  const stringArray: string[] = uniqueBodyType.map((element) => element.bodyType);
  return stringArray;
  
}   


}

