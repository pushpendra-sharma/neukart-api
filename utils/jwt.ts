import * as jwt from 'jsonwebtoken';
import { logger } from './logger';

interface Payload {
  id: string;
  username: string;
}

export function signJwt(
  payload: Payload,
  secret: string,
  expiresIn: string
): string {
  const options = {
    expiresIn,
  };
  return jwt.sign(payload, secret, options);
}

export function verifyJwt(token: string, secret: string) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Invalid token', err.message);
    }
    return null;
  }
}
