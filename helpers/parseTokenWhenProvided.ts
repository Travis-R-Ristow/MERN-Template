import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const parseTokenWhenProvided = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  try {
    req.body.user = jwt.verify(authHeader ?? '', 'testPSW');
  } catch (err) {
    console.log('Token not provided or invalid');
  }

  next();
};
