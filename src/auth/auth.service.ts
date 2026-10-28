import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { RegisterDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Bu e-posta adresi zaten kullanımda.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        role: dto.role || Role.USER,
      },
    });

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Geçersiz e-posta veya şifre.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Geçersiz e-posta veya şifre.');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ...tokens };
  }

  async getTokens(userId: string, email: string, role: Role) {
    const payload = { sub: userId, email, role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET || 'artemis_access_super_secret_key_2026',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'artemis_refresh_super_secret_key_2026',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: hash },
    });
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshTokenHash) {
      throw new ForbiddenException('Erişim reddedildi.');
    }

    const isMatch = await bcrypt.compare(rt, user.refreshTokenHash);
    if (!isMatch) {
      throw new ForbiddenException('Geçersiz refresh token.');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }
}