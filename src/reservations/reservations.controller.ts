import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // 1. Dolu saatleri getiren uç nokta (Giriş yapmamış hastalar da takvimi görebilsin diye guard dışında)
  @Get('busy-slots')
  getBusySlots() {
    return this.reservationsService.getBusySlots();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(req.user.id, createReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.reservationsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}