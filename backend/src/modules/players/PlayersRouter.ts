
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
 *         fullname: Lionel Andrés Messi Cuccittini
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

import { Router } from "express";
import { PlayersController } from "./adapters/controllers/playersController";

const playersRouter= Router()
/**
 * @swagger
 * tags:
 *   name: Player
 *   description: Jugadores en la app
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los jugadores
 *     description: Retorna un array con todos los jugadores registrados
 *     tags:
 *       - Player
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: number
 *         required: false
 *         description: número de página a buscar
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         required: false
 *         description: número de registros por página
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         required: false
 *         description: campo por el cual ordenar
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: number
 *         required: false
 *         description: dirección por la cual ordenar
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         required: false
 *         description: para buscar el fullname por patrón
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         required: false
 *         description: nombre del equipo al que pertenece el jugador
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         required: false
 *         description: posición en la que juega
 *       - in: query
 *         name: fifaVersion
 *         schema:
 *           type: string
 *         required: false
 *         description: para buscar la versión del juego
 *       - in: query
 *         name: fifaUpdate
 *         schema:
 *           type: boolean
 *         required: false
 *         description: para filtrar los no actualizados
 *       - in: query
 *         name: minOverall
 *         schema:
 *           type: number
 *         required: false
 *         description: valor mínimo de puntaje general
 *       - in: query
 *         name: minPace
 *         schema:
 *           type: number
 *         required: false
 *         description: valor mínimo de velocidad
 *       - in: query
 *         name: minShooting
 *         schema:
 *           type: number
 *         required: false
 *         description: valor mínimo de remate
 *       - in: query
 *         name: minPassing
 *         schema:
 *           type: number
 *         required: false
 *         description: valor mínimo de pases
 *       - in: query
 *         name: minDribbling
 *         schema:
 *           type: number
 *         required: false
 *         description: valor mínimo de dribbling
 *       - in: query
 *         name: minDefending
 *         schema:
 *           type: number
 *         required: false
 *         description: valor mínimo de defensa
 *       - in: query
 *         name: minPhysic
 *         schema:
 *           type: number
 *         required: false
 *         description: valor mínimo de físico
 *     responses:
 *       200:
 *         description: Lista paginada de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedPlayersResponse'
 *       400:
 *         description: Error en la petición
 *       500:
 *         description: Error interno del servidor
 */
playersRouter.get(
  "/",
  PlayersController.getPaginatedPlayers
);

playersRouter.get(
  "/csv",
  PlayersController.getPlayersCSV
);
export default playersRouter
