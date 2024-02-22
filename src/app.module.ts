import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PostModule } from './post/post.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [RegisterModule, LoginModule, PostModule, FollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
