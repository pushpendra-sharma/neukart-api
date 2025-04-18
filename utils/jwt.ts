import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { logger } from './logger';

interface Payload extends JwtPayload {
  id: string;
  username: string;
}

export function signJwt(payload: Payload, secret: string): string {
  const options: SignOptions = {
    expiresIn: '1d',
  };

  // jwt.sign overload with payload as object
  return jwt.sign(payload, secret, options);
}

export function verifyJwt(token: string, secret: string): Payload | null {
  try {
    const decoded = jwt.verify(token, secret) as Payload;
    return decoded;
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Invalid token', err.message);
    }
    return null;
  }
}
