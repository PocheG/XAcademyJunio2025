import { PlayerForTable } from "../../models/playerForTable";

/**
 * @swagger
 * components:
 *   schemas:
 *     PaginatedPlayersResponse:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Player'
 *           description: Lista paginada de jugadores
 *         pagination:
 *           type: object
 *           properties:
 *             totalResults:
 *               type: integer
 *               description: Cantidad total de jugadores encontrados
 *             totalPages:
 *               type: integer
 *               description: Cantidad total de páginas
 *       example:
 *         results:
 *           - id: 1
 *             fullname: Lionel Andrés Messi Cuccittini
 *             fifaVersion: 23
 *             fifaUpdate: "1"
 *             playerFaceUrl: urlDEejemplo.com
 *             overall: 99
 *             pace: 99
 *             shooting: 99
 *             passing: 99
 *             dribbling: 99
 *             defense: 98
 *             physic: 99
 *         pagination:
 *           totalResults: 100
 *           totalPages: 10
 */
export interface PaginatedPlayersResponse{
    results: PlayerForTable[];
    pagination:{
        totalResults:number,
        totalPages:number
    }
}