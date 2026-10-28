import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: { title: string; startDate: string; endDate: string }) {
    return this.prisma.reservation.create({
      data: {
        title: data.title,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        userId: userId,
      },
    });
  }

  
  async findAll(userId: number) {
    return this.prisma.reservation.findMany({
      where: { userId },
      orderBy: { startDate: 'asc' },
    });
  }

  
  async findOne(userId: number, id: number) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Rezervasyon bulunamadı.');
    }

    if (reservation.userId !== userId) {
      throw new ForbiddenException('Bu rezervasyona erişim yetkiniz yok.');
    }

    return reservation;
  }

  // 4. Rezervasyon güncelle
  async update(userId: number, id: number, data: { title?: string; startDate?: string; endDate?: string }) {
    await this.findOne(userId, id); 

    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate && { endDate: new Date(data.endDate) }),
      },
    });
  }

  // 5. Rezervasyon sil
  async remove(userId: number, id: number) {
    await this.findOne(userId, id); 

    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}