import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/auth')
  @UsePipes(new ValidationPipe())
  async authUser(@Body() dto: LoginDto) {
    return this.loginService.authUser(dto);
  }
}