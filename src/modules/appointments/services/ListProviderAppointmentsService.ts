import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    month,
    year,
    day,
  }: IRequest): Promise<Array<Appointment>> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { providerId, month, year, day },
    );

    return appointments;
  }
}
