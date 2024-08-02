import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(body: UserDto) {
    const hash = await bcrypt.hash(body.password, 10);

    return this.prisma.user.create({
      data: {
        uuid: uuid(),
        password: hash,
        id: body.id,
        name: body.name,
        email: body.email,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(username: string) {
    return this.prisma.user.findFirst({
      where: { id: username },
    });
  }

  async update(userUuid: string, body: UserDto): Promise<UserDto> {
    return this.prisma.user.update({
      where: { uuid: userUuid },
      data: { ...body },
    });
  }

  async delete(userUuid: string): Promise<UserDto> {
    return this.prisma.user.delete({
      where: { uuid: userUuid },
    });
  }
}
