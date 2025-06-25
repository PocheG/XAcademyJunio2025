
/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador del jugador
 *         longName:
 *           type: string
 *           description: Nombre completo del jugador
 *         fifaVersion:
 *           type: string
 *           description: versión del juego en la que esta registrado el jugador
 *         fifaUpdate:
 *           type: string
 *           description: indica si los datos del jugador estan actualizados
 *         playerFaceUrl:
 *           type: string
 *           description: Url de la foto del jugador
 *         overall:
 *           type: number
 *           description: puntaje general del jugador
 *         pace:
 *           type: number
 *           description: puntaje de velocidad
 *         shooting:
 *           type: string
 *           description: puntaje de remates
 *         passing:
 *           type: number
 *           description: puntaje de pases
 *         dribbling:
 *           type: number
 *           description: puntaje de dribbling
 *         defense:
 *           type: number
 *           description: puntaje de defensa
 *         physic:
 *           type: number
 *           description: puntaje de fisico
 *       example:
 *         id: 1
 *         longName: Lionel Andrés Messi Cuccittini
 *         fifaVersion: 23
 *         fifaUpdate: "1"
 *         playerFaceUrl: urlDEejemplo.com
 *         overall: 99
 *         pace: 99
 *         shooting: 99
 *         passing: 99
 *         dribbling: 99
 *         defense: 98
 *         physic: 99
 */

export class PlayerForTable{
    id: number
    fifaVersion: string
    fifaUpdate:string
    playerFaceURL: string
    longName: string
    team:string
    positions:string
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
        this.overall= data.overall
        this.team=data.team;
        this.positions=data.positions
        this.pace= data.pace
        this.shooting= data.shooting
        this.passing = data.passing
        this.dribbling= data.dribbling
        this.defending= data.defending
        this.physic= data.physic
    }
}