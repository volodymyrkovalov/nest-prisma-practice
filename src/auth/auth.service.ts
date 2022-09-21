import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public signin() {
    console.log('login');
  }

  public signup() {
    console.log('signup');
  }
}
