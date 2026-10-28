import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateReservationDto) {
    return this.reservationsService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.reservationsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.reservationsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, req.user.id, req.user.role, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.reservationsService.remove(id, req.user.id, req.user.role);
  }
}