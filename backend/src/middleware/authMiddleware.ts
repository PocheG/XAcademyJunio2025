import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../modules/auth/service/jswService';
import { AuthenticationError } from '../errors/AuthenticationError';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    throw new AuthenticationError('No se ha proporcionado un token')
  }

  const decoded = jwtService.verify(token);

  if (!decoded) {
    throw new AuthenticationError('El token proporcionado es invalido o ha expirado')
  }

  // @ts-ignore
  req.user = decoded;
  next();
}