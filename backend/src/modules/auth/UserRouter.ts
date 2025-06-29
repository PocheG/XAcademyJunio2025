import { Router } from "express";
import { userController } from "./adapters/controllers/UserController";

const userRouter= Router()
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y seguridad
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Crea la sesión si se logea con el usuario correcto
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: nombre del usuario
 *               password:
 *                 type: string
 *                 description: contraseña con la que se intenta logear
 *     responses:
 *       200:
 *         description: El usuario existe
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: Error en la autenticación
 *       500:
 *         description: Error interno del servidor
 */

userRouter.post("/login", userController.login);

export default userRouter