import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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

    await this.cacheProvider.save('dpaoskd', 'paosdkasd');

    return appointments;
  }
}
