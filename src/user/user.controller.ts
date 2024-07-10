import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserDto): Promise<UserDto> {
    return this.userService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const result: UserDto = await this.userService.findOne(parseInt(id));
    // console.log(result);
    if (result === null)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There is no user with id=${id}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    return result;
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UserDto,
  ): Promise<UserDto | null> {
    const result: UserDto = await this.userService.findOne(parseInt(id));
    if (result === null)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There is no user with id=${id}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.userService.update(parseInt(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDto> {
    const result: UserDto = await this.userService.findOne(parseInt(id));
    if (result === null) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There is no user with id=${id}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.delete(parseInt(id));
  }
}
