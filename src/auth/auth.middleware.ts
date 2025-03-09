import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).send('Token not provided');
    }

    try {
      const secret = process.env.JWT_SECRET || 'test-secret';

      const decoded = jwt.verify(token, secret);

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(403).send('Invalid token');
    }
  }
}
