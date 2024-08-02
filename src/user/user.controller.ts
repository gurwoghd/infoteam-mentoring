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
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserDto): Promise<UserDto> {
    return this.userService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    if (parseInt(id) == 1) throw new BadRequestException();
    const result: UserDto = await this.userService.findOne(id);
    if (result === null) {
      this.logger.error(`There is no user with id=${id}, {/user/:id, GET}`);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There is no user with id=${id}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() body: UserDto,
  ): Promise<UserDto> {
    const result: UserDto = await this.userService.findOne(uuid);
    if (result === null) {
      this.logger.error(
        `There is no user with id=${uuid}, {/user/:uuid, PATCH}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There is no user with id=${uuid}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.update(uuid, body);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<UserDto> {
    const result: UserDto = await this.userService.findOne(uuid);
    if (result === null) {
      this.logger.error(
        `There is no user with id=${uuid}, {/user/:uuid, DELETE}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There is no user with id=${uuid}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.delete(uuid);
  }
}
