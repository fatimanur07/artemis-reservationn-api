export class CreateReservationDto {
  title: string;
  startDate: string;
  endDate: string;
  serviceIds?: string[];
}

export class UpdateReservationDto {
  title?: string;
  startDate?: string;
  endDate?: string;
  serviceIds?: string[];
}