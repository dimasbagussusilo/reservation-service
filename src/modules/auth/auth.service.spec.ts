import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './auth.dto';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UserService;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
  } as User;

  const mockRegisterDto: RegisterDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const jwtPayload = { email: 'test@example.com', sub: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockToken'),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should throw BadRequestException if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(
        authService.validateUser('nonexistent@example.com', 'password123'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      // jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        authService.validateUser(mockUser.email, 'wrongpassword'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await authService.login(mockUser);

      expect(result).toEqual({ access_token: 'mockToken' });
      expect(jwtService.sign).toHaveBeenCalledWith(jwtPayload);
    });
  });

  describe('register', () => {
    it('should create a new user and return it without the password', async () => {
      const createdUser = { ...mockUser };
      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

      const result = await authService.register(mockRegisterDto);

      expect(result).toEqual({ id: mockUser.id, email: mockUser.email });
      expect(usersService.create).toHaveBeenCalledWith(mockRegisterDto);
    });
  });
});
