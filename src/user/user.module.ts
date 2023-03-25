import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [TypeOrmModule, JwtModule],
})
export class UserModule {}
