import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

interface RequestUser extends Request {
  currentUser?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async use(req: RequestUser, res: Response, next: NextFunction) {
    // const jwt = req.cookies['token'];
    const bearerToken = req.headers['authorization'];

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const jwt = bearerToken.substring(7);

    const decoded = await this.jwtService.verifyAsync(jwt);
    const user = await this.userService.findOne(decoded.id);

    req.currentUser = user;

    next();
  }
}
