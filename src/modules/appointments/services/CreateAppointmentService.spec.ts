import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppoint context', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let createAppointmentService: CreateAppointmentService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    expect.hasAssertions();
    const providerId = Date.now().toString();
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      providerId,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe(providerId);
  });

  it('should not be able to create two appointment on the same time', async () => {
    expect.hasAssertions();
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: Date.now().toString(),
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: Date.now().toString(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
