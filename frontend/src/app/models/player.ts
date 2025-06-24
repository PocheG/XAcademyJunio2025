
export class Player{
    id: number
    fifaVersion: string
    fifaUpdate:string
    playerFaceURL: string
    team:string
    positions:string
    longName: string
    overall: number
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physic: number

    constructor(data:any){
        this.id=data.id
        this.fifaVersion= data.fifaVersion
        this.fifaUpdate=data.fifaUpdate,
        this.playerFaceURL= data.playerFaceURL
        this.longName=data.longName
        this.team=data.team
        this.positions=data.positions
        
        this.overall= data.overall
        this.pace= data.pace
        this.shooting= data.shooting
        this.passing = data.passing
        this.dribbling= data.dribbling
        this.defending= data.defending
        this.physic= data.physic
    }
}