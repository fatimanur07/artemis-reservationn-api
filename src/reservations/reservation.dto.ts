import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 'Özel Rezervasyon' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2026-11-01T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2026-11-01T12:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional({ example: ['service-uuid-1'], type: [String] })
  @IsArray()
  @IsOptional()
  serviceIds?: string[];
}

export class UpdateReservationDto {
  @ApiPropertyOptional({ example: 'Güncellenen Rezervasyon' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: '2026-11-02T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-11-02T12:00:00Z' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: ['service-uuid-1'], type: [String] })
  @IsArray()
  @IsOptional()
  serviceIds?: string[];
}