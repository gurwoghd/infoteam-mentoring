import { Injectable } from '@nestjs/common';
import { SearchPostQueryDto } from './dto/searchPostQueryDto';
import { PostRepository } from './post.repository';
import { CreatePostQueryDto } from './dto/createPostQueryDto';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async search(query: SearchPostQueryDto) {
    return this.postRepository.search(query);
  }

  async create(query: CreatePostQueryDto, user: any) {
    return this.postRepository.create(query, user.uuid);
  }
}
