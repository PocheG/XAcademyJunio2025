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
 *         playerFaceURL:
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
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         stats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               labels:
 *                 type: array
 *                 items:
 *                   type: string
 *               values:
 *                 type: array
 *                 items:
 *                   type: number
 *       example:
 *         id: 1
 *         longName: Lionel Andrés Messi Cuccittini
 *         fifaVersion: "23"
 *         fifaUpdate: "1"
 *         playerFaceURL: "https://ejemplo.com/messi.jpg"
 *         reputation: 43
 *         team: Inter Miami
 *         heightCm: 160
 *         age: 34
 *         weightKg: 70
 *         nationality: argentino
 *         preferredFoot: zurdo
 *         positions: cd
 *         bodyType: 2
 *         tags: [captain, good dribbler, Mental Player]
 *         stats:
 *           - title: "Ataque"
 *             labels:
 *               Precisión de centro
 *               Definición
 *               Precisión cabezazos 
 *               Pases cortos 
 *               Voleas
 *             values:
 *               99
 *               99
 *               99
 *               99
 *               99
 *           - title: "Overall"
 *             labels: 
 *               Velocidad 
 *               Remates
 *               Pases 
*                Regate
*                Físico
*                Defensa
 *             values: 
 *               99
 *               99
 *               99
 *               99
 *               99
 *               99
 * 
 */
export class PlayerById{
    id: number
    fifaVersion: string
    fifaUpdate:string
    playerFaceURL: string
    longName: string
    reputation:number;
    team:string
    age:number
    heightCm:number;
    weightKg:number;
    nationality:string
    preferredFoot:string;
    positions:string
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
        this.team=data.team;
        this.positions=data.positions
        this.reputation=data.reputation
        this.age=data.age
        this.heightCm=data.heightCm
        this.weightKg= data.weightKg
        this.nationality= data.nationality
        this.preferredFoot= data.preferredFoot
        this.bodyType= data.bodyType
        this.tags= data.traits
        this.stats=[{
            title:"Ataque",
            labels:["Precisión de centro","definición", "Precisión cabezasos","Pases cortos", "Voleas"],
            values:[data.attackingCrossing, 
                data.attackingFinishing,
                data.attackingHeadingAccuracy,
                data.attackingShortPassing,
                data.attackingVolleys
            ]
            },{
                title:"Overall",
                labels:["Velocidad","Remates","Pases", "Regate","Físico", "Defensa",],
                values:[data.pace, 
                    data.shooting,
                    data.passing,
                    data.dribbling,
                    data.physic,
                    data.defending
                ]

            }   
    ]


    }
}
