import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_pw'),
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('mocked_jwt_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('servis başarıyla tanımlanmalıdır', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('yeni bir kullanıcı kaydedip token dönmelidir', async () => {
      const registerDto = {
        email: 'test@mail.com',
        password: 'Password123!',
        name: 'Test',
        role: Role.USER,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: 'mock-uuid-1',
        email: registerDto.email,
        name: registerDto.name,
        role: registerDto.role,
      });
      mockPrismaService.user.update.mockResolvedValue({});

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe(registerDto.email);
    });
  });

  describe('getTokens', () => {
    it('access ve refresh token çifti üretmelidir', async () => {
      const tokens = await service.getTokens('mock-uuid-1', 'test@mail.com', Role.USER);
      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });
  });
});