import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchPostQueryDto } from './dto/searchPostQueryDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreatePostQueryDto } from './dto/createPostQueryDto';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async search({ name }: SearchPostQueryDto) {
    return this.prisma.post
      .findMany({
        where: {
          User: {
            name,
          },
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2025') throw new NotFoundException('Invalid ID');
          throw new InternalServerErrorException(
            'Unexpected Database Error Occurred',
          );
        }
        throw new InternalServerErrorException('Unexpected Error Occurred');
      });
  }

  async create({ content }: CreatePostQueryDto, userUuid: string) {
    return this.prisma.post
      .create({
        data: {
          content,
          userUuid,
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'Unexpected Database Error Occurred',
          );
        }

        throw new InternalServerErrorException('Unexpected Error Occurred');
      });
  }
}
