import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
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
}

export default FakeAppointmentsRepository;
