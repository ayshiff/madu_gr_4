import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ConfigService,
        {
          provide: getModelToken('User'),
          useValue: function mockUserModel(dto: any) {
            this.data = dto;
            this.save  = () => {
              return this.data;
            };
          },
          // useValue: (dto: any) => ({ save: () => dto }),
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      const dto = new CreateUserDto();
      expect(await service.create(dto, 'id')).toBe(dto);
    });
  });
});
