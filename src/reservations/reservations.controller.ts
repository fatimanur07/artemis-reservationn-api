import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReservationDto } from './reservation.dto';

@ApiTags('Reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiBody({ type: CreateReservationDto })
  create(@Request() req: any, @Body() body: CreateReservationDto) {
    return this.reservationsService.create(req.user.id, body);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.reservationsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.reservationsService.findOne(req.user.id, +id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: Partial<CreateReservationDto>,
  ) {
    return this.reservationsService.update(req.user.id, +id, body);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.reservationsService.remove(req.user.id, +id);
  }
}