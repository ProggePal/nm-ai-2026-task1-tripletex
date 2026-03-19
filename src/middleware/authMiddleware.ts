import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors.js';

declare global {
  namespace Express {
    interface Request {
      tokenData?: jwt.JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AuthenticationError('No token provided'));
  }

  if (!authHeader.startsWith('Bearer ')) {
    return next(new AuthenticationError('Invalid Authorization header'));
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.tokenData = decoded as jwt.JwtPayload;
    next();
  } catch (err) {
    next(new AuthenticationError((err as Error).message));
  }
}
