import { Request, Response, NextFunction } from 'express';
import { logger, verifyJwt } from '../utils';

export const authVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = (authHeader && authHeader.split(' ')[1]) || '';

    if (!token) {
      logger.error('Provide a valid token');
      throw new Error('Provide a valid token');
    }
    const result = verifyJwt(token, process.env.MY_SECRET || '');

    res.locals.user = result;
    return next();
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Provide a valid token', err.message);
      return next();
    }
  }
};
