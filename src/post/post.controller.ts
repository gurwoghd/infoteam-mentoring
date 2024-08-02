import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { SearchPostQueryDto } from './dto/searchPostQueryDto';
import { CreatePostQueryDto } from './dto/createPostQueryDto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('posts')
  async search(@Query() query: SearchPostQueryDto) {
    return this.postService.search(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Query() query: CreatePostQueryDto, @Request() req: any) {
    console.log(req.user);
    return this.postService.create(query, req.user);
  }
}
