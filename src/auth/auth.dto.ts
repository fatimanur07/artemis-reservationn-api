import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsEmail({}, { message: 'Geçerli bir e-posta giriniz' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'İsim alanı boş bırakılamaz' })
  name: string;

  @IsOptional()
  role?: Role;
}

export class LoginDto {
  @IsEmail({}, { message: 'Geçerli bir e-posta giriniz' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Şifre boş bırakılamaz' })
  password: string;
}