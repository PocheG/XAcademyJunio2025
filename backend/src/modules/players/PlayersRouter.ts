

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
 *     description: Retorna un array con todos los jugadores registrados que cumplan los filtros
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
 *         name: longName
 *         schema:
 *           type: string
 *         required: false
 *         description: para buscar el longName por patrón
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

/**
 * @swagger
 * /csv:
 *   get:
 *     summary: Obtiene todos los jugadores
 *     description: Retorna un archivo csv de todos los jugadores registrados que cumplan los filtros
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
 *         name: longName
 *         schema:
 *           type: string
 *         required: false
 *         description: para buscar el longName por patrón
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
 *         description: Archivo CSV con la lista de jugadores
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Error en la petición
 *       500:
 *         description: Error interno del servidor
 */
playersRouter.get(
  "/csv",
  PlayersController.getPlayersCSV
);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene los datos de un jugador
 *     description: Retorna el jugador correspondiente con el id
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: id del jugador a buscar
 *     responses:
 *       200:
 *         description: JUgador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerById'
 *       400:
 *         description: id invalido
 *       404:
 *         description: jugador no encontrado
 *       500:
 *         description: Error interno del servidor
 */
playersRouter.get(
  "/:id",
  PlayersController.getPlayerById
);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Obtiene todos los equipos registrados
 *     description: Retorna un array con todos los equipos registrados
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: Lista de equipos registrados
 *         content:
 *           application/json:
 *             type:string[]
 *       500:
 *         description: Error interno del servidor
 */
playersRouter.get(
  "/teams",
  PlayersController.getTeams
);

/**
 * @swagger
 * /versions:
 *   get:
 *     summary: Obtiene todas las versiones registradas
 *     description: Retorna un array con todas las versiones registradas
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: Lista de versiones
 *         content:
 *           application/json:
 *             type:string[]
 *       500:
 *         description: Error interno del servidor
 */
playersRouter.get(
  "/versions",
  PlayersController.getVersions
);

/**
 * @swagger
 * /positions:
 *   get:
 *     summary: Obtiene todos las posiciones registradas
 *     description: Retorna un array con todas las posiciones registradas
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: Lista de posiciones registradas
 *         content:
 *           application/json:
 *             type:string[]
 *       500:
 *         description: Error interno del servidor
 */
playersRouter.get(
  "/positions",
  PlayersController.getPositions
);
export default playersRouter
