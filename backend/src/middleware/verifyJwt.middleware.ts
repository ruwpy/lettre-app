import { UnauthorizedException } from '@nestjs/common/exceptions';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VerifyJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['authorization'] === undefined)
        throw new UnauthorizedException();
      const user = <JwtPayload>(
        verify(
          req.headers['authorization'].split(' ')[1],
          process.env.SUPA_JWT_SECRET,
        )
      );

      req.user = user;

      next();
    } catch (error) {
      console.log(error);

      next(new UnauthorizedException());
    }
  }
}
