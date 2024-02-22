import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { RegisterService } from './register.service'
import { RegisterDto } from './register.dto'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() dto: RegisterDto) {
      return this.registerService.createUser(dto);
    }
}