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
      throw new Error('Provide a token');
    }
    const result = verifyJwt(token, process.env.MY_SECRET || '');
    if (!result) {
      throw new Error('Provide a valid token');
    }
    res.locals.user = result;
    return next();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
      res.status(400).json({ success: false, message: err.message });
    }
  }
};
