
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
    age:number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physic: number
    reputation:number
    heightCm:number;
    weightKg:number;
    nationality:string
    preferredFoot:string;
    bodyType:number
    tags:string[]
    stats:{        
        title:string;
        labels:string[],
        values:number[]
    }[]

    constructor(data:any){
        this.id=data.id
        this.fifaVersion= data.fifaVersion
        this.fifaUpdate=data.fifaUpdate,
        this.playerFaceURL= data.playerFaceURL
        this.longName=data.longName
        this.team=data.team
        this.age=data.age
        this.positions=data.positions
        this.overall= data.overall
        this.pace= data.pace
        this.shooting= data.shooting
        this.passing = data.passing
        this.dribbling= data.dribbling
        this.defending= data.defending
        this.physic= data.physic
        this.reputation= data.reputation
        this.heightCm= data.heightCm
        this.weightKg= data.weightKg
        this.nationality= data.nationality
        this.preferredFoot = data.preferredFoot
        this.positions = data.positions
        this.bodyType = data.bodyType
        this.tags= data.tags
        this.stats=data.stats
    }
}