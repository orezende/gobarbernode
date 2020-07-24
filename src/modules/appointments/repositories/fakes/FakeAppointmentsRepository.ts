import { uuid } from 'uuidv4';
import { getMonth, getYear } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  appointments: Array<Appointment> = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.appointments.find(
      appointment => appointment.date.getTime() === date.getTime(),
    );

    return findAppointment;
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      providerId,
    });

    await this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({
    month,
    providerId,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Array<Appointment>> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }
}
