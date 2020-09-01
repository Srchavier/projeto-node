import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

export default function ensumeAuthenticated(
  resquest: Request,
  response: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = resquest.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // eslint-disable-next-line no-param-reassign
    resquest.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError('invalid JWT token', 401);
  }
}
