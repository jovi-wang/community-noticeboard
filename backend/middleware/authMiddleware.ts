import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization headers' });
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length !== 2 || tokenBearer[0] !== 'Bearer') {
    return res.status(401).send({ message: 'Malformed token' });
  }

  const token = tokenBearer[1];
  return jwt.verify(token, process.env.JWT_SECRET || 'secret_jwt', (err) => {
    if (err) {
      return res.status(500).send({ message: 'Invalid token' });
    }
    return next();
  });
};
