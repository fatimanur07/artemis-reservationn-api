import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 'Toplantı Salonu A' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '2026-10-15T10:00:00.000Z' })
  @IsNotEmpty()
  @IsISO8601()
  startDate: string;

  @ApiProperty({ example: '2026-10-15T11:00:00.000Z' })
  @IsNotEmpty()
  @IsISO8601()
  endDate: string;
}