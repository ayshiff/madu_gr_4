import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { getModelToken } from '@nestjs/mongoose';

describe('CatsController', () => {
  let userController: UserController;
  let UserService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          UserService,
          ConfigService,
          {
            provide: getModelToken('User'),
            useValue: (dto: any) => ({ save: () => dto }),
          }
        ],
      }).compile();

      UserService = moduleRef.get<UserService>(UserService);
      userController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 'string',
          email: 'string',
          firstname: 'string',
          lastname: 'string',
          password: 'string',
          roles: 'string',
          company_id: 'string'
        }
      ]
      let result = new Promise<User[]>(resolve => resolve(users));
      jest.spyOn(UserService, 'findAll').mockImplementation(() => result);

      expect(await userController.findAll()).toBe(users);
    });
  });

  describe('getProfile', () => {
    it('should return an user', async () => {
      const user ={
        id: 'string',
        email: 'string',
        firstname: 'string',
        lastname: 'string',
        password: 'string',
        roles: 'string',
        company_id: 'string'
      }

      expect(await userController.getProfile({user: user})).toBe(user);
    });
  });
});