import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateReservationDto) {
    const { title, startDate, endDate, serviceIds } = dto;
    return this.prisma.reservation.create({
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
        services: serviceIds && serviceIds.length > 0
          ? { connect: serviceIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        services: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findAll(userId?: string, role?: string) {
    if (role === 'ADMIN') {
      return this.prisma.reservation.findMany({
        include: {
          services: true,
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.reservation.findMany({
      where: userId ? { userId } : undefined,
      include: { services: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId?: string, role?: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        services: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!reservation) {
      throw new NotFoundException('Rezervasyon bulunamadı.');
    }

    if (role !== 'ADMIN' && userId && reservation.userId !== userId) {
      throw new ForbiddenException('Bu rezervasyona erişim yetkiniz yok.');
    }

    return reservation;
  }

  async update(id: string, userId: string, role: string, dto: UpdateReservationDto) {
    await this.findOne(id, userId, role);
    const { title, startDate, endDate, serviceIds } = dto;

    return this.prisma.reservation.update({
      where: { id },
      data: {
        title,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        services: serviceIds
          ? { set: serviceIds.map((sId) => ({ id: sId })) }
          : undefined,
      },
      include: { services: true },
    });
  }

  async remove(id: string, userId: string, role: string) {
    await this.findOne(id, userId, role);
    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}