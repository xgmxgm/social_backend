import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FollowService } from './follow.service';
import { follow, followDelete } from './follow.dto'

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async follow(@Body() dto: follow) {
    return this.followService.follow(dto);
  }

  @Post('delete')
  @UsePipes(new ValidationPipe())
  async followDelete(@Body() dto: followDelete) {
    return this.followService.followDelete(dto);
  }
}