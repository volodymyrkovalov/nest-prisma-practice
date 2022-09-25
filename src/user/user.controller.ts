import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(
    @GetUser('id') userId: number,
    @GetUser() user: User,
    @GetUser('email') email: string,
  ) {
    return {
      user,
      userId,
      email,
    };
  }
}
