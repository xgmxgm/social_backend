import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto, deletePostDto, editPostDto } from './post.dto'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @Post('/create')
  @UsePipes(new ValidationPipe())
  async createPost(@Body() dto: createPostDto) {
    return this.postService.createPost(dto);
  }

  @Post('/delete')
  @UsePipes(new ValidationPipe())
  async deletePost(@Body() dto: deletePostDto) {
    return this.postService.deletePost(dto);
  }

  @Post('/edit')
  @UsePipes(new ValidationPipe())
  async editPost(@Body() dto: editPostDto) {
    return this.postService.editPost(dto);
  }
}