import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('create', () => {
    it('should make User info into database', async () => {
      const result: Promise<UserDto> = new Promise((resolve) => {
        resolve({ name: '홍혁재', email: 'asdf@gmail.com' });
      });

      const request: UserDto = {
        name: '홍혁재',
        email: 'asdf@gmail.com',
      };
      const result2: Promise<UserDto> = new Promise((resolve) => {
        resolve(request);
      });

      jest.spyOn(userService, 'create').mockImplementation(() => result2);

      expect(userController.create(request)).toBe(result);
    });
  });

  describe('findAll()', () => {
    it('should return all data in user database', async () => {
      const result: Promise<UserDto[]> = new Promise((resolve) => {
        resolve([
          {
            name: '홍혁재',
            email: 'asdfasf@gmail.com',
          },
        ]);
      });

      jest.spyOn(userService, 'findAll').mockImplementation(() => result);

      expect(await userController.findAll()).toBe(await result);
    });
  });

  //   describe('findOne', () => {
  //     it('should the specific user info from user database', async () => {
  //       const result: Promise<UserDto> = new Promise(re);
  //     });
  //   });
});
