import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';

@Injectable()
export class ReservationsService { 
  constructor(private prisma: PrismaService) {}

  
  async getBusySlots() {
    return this.prisma.reservation.findMany({
      select: {
        title: true,
        startDate: true,
      },
    });
  }

  
  async create(userId: string, dto: CreateReservationDto) {
    const { title, startDate, endDate, serviceIds = [] } = dto;

    
    const existing = await this.prisma.reservation.findFirst({
      where: {
        title,
        startDate: new Date(startDate),
      },
    });

    if (existing) {
      throw new BadRequestException('Bu hekim ve saat için randevu daha önce başka bir hasta tarafından alınmıştır!');
    }

    return this.prisma.reservation.create({
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
        services: serviceIds.length
          ? {
              connect: serviceIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: {
        services: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { services: true },
    });
  }

  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: { services: true },
    });

    if (!reservation) {
      throw new NotFoundException('Rezervasyon bulunamadı');
    }

    return reservation;
  }

  async update(id: string, dto: UpdateReservationDto) {
    await this.findOne(id);

    const { serviceIds, startDate, endDate, ...rest } = dto;

    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...rest,
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(serviceIds && {
          services: {
            set: serviceIds.map((srvId: string) => ({ id: srvId })),
          },
        }),
      },
      include: { services: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}