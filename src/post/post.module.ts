import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService, PostRepository],
})
export class PostModule {}
