import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '../ListProviderAppointmentsService';

describe('ListProviderAppointments context', () => {
  let fakeAppointmentRepository: FakeAppointmentRepository;
  let listProviderAppointmentsService: ListProviderAppointmentsService;

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list all apppointments from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 1, 11).getTime();
    });

    const appointment1 = await fakeAppointmentRepository.create({
      providerId: 'fake-provider-id',
      userId: 'fake-user-id',
      date: new Date(2020, 6, 25, 8),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      providerId: 'fake-provider-id',
      userId: 'fake-user-id',
      date: new Date(2020, 6, 25, 8),
    });

    const appointment3 = await fakeAppointmentRepository.create({
      providerId: 'fake-provider-id',
      userId: 'fake-user-id',
      date: new Date(2020, 6, 25, 8),
    });

    const appointments = await listProviderAppointmentsService.execute({
      day: 25,
      month: 7,
      year: 2020,
      providerId: 'fake-provider-id',
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
