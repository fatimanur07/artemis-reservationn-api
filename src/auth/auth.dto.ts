import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  role?: Role;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}