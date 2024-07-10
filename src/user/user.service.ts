import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(body: UserDto): Promise<UserDto> {
    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
  }

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserDto> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async update(id: number, body: UserDto): Promise<UserDto> {
    return this.prisma.user.update({
      where: { id },
      data: { ...body },
    });
  }

  async delete(id: number): Promise<UserDto> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
