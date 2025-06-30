/**
 * @swagger
 * components:
 *   schemas:
 *     PlayerById:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         longName:
 *           type: string
 *         fifaVersion:
 *           type: string
 *         fifaUpdate:
 *           type: string
 *         playerFaceUrl:
 *           type: string
 *         reputation:
 *           type: number
 *         team:
 *           type: string
 *         heightCm:
 *           type: number
 *         age:
 *           type: number
 *         weightKg:
 *           type: number
 *         nationality:
 *           type: string
 *         preferredFoot:
 *           type: string
 *         positions:
 *           type: string
 *         bodyType:
 *           type: number
 *         traits:
 *           type: array
 *           items:
 *             type: string
 *         attackingCrossing:
 *           type: number
 *         attackingFinishing:
 *           type: number
 *         attackingHeadingAccuracy:
 *           type: number
 *         attackingShortPassing:
 *           type: number
 *         attackingVolleys:
 *           type: number
 *         pace:
 *           type: number
 *         physic:
 *           type: number
 *         shooting:
 *           type: number
 *         defending:
 *           type: number
 *         passing:
 *           type: number
 *         dribbling:
 *           type: number
 *         overall:
 *           type: number
 *       example:
 *         id: 1
 *         longName: Lionel Andrés Messi Cuccittini
 *         fifaVersion: "23"
 *         fifaUpdate: "1"
 *         playerFaceUrl: "https://ejemplo.com/messi.jpg"
 *         reputation: 43
 *         team: Inter Miami
 *         heightCm: 160
 *         age: 34
 *         weightKg: 70
 *         nationality: argentino
 *         preferredFoot: zurdo
 *         positions: cd
 *         bodyType: 2
 *         traits: [captain, good dribbler, Mental Player]
 *         attackingCrossing: 99
 *         attackingFinishing: 99
 *         attackingHeadingAccuracy: 99
 *         attackingShortPassing: 99
 *         attackingVolleys: 99
 *         pace: 99
 *         physic: 99
 *         shooting: 99
 *         defending: 99
 *         passing: 99
 *         dribbling: 99
 *         overall: 99
 * 
 */
export class PlayerById{
    id: number
    fifaVersion: string
    fifaUpdate:string
    playerFaceUrl: string
    longName: string
    reputation:number;
    team:string
    age:number
    heightCm:string;
    weightKg:number;
    nationality:string
    preferredFoot:string;
    positions:string
    bodyType:number
    traits:string[]
    attackingCrossing:number
    attackingFinishing:number
    attackingHeadingAccuracy: number
    attackingShortPassing:number
    attackingVolleys: number
    pace:number
    physic:number
    shooting:number
    defending:number
    passing:number
    dribbling:number
    overall:number

    constructor(data:any){
        this.id=data.id
        this.fifaVersion= data.fifaVersion
        this.fifaUpdate=data.fifaUpdate,
        this.playerFaceUrl= data.playerFaceUrl
        this.longName=data.longName
        this.team=data.team;
        this.positions=data.positions
        this.reputation=data.reputation
        this.age=data.age
        this.heightCm=(data.heightCm/100).toFixed(2)
        this.weightKg= data.weightKg
        this.nationality= data.nationality
        this.preferredFoot= data.preferredFoot
        this.bodyType= data.bodyType
        this.traits= data.traits
        this.attackingCrossing=data.attackingCrossing, 
        this.attackingFinishing=data.attackingFinishing,
        this.attackingHeadingAccuracy=data.attackingHeadingAccuracy,
        this.attackingShortPassing=data.attackingShortPassing,
        this.attackingVolleys=data.attackingVolleys
        this.pace= data.pace
        this.dribbling= data.dribbling
        this.defending= data.defending
        this.shooting= data.shooting
        this.physic= data.physic
        this.passing= data.passing
        this.overall= data.overall

    }
}
