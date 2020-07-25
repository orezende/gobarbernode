import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '../ListProviderMonthAvailabilityService';

describe('ListProvidersMonthAvailability context', () => {
  let fakeAppointmentRepository: FakeAppointmentRepository;
  let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 11, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 12, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 13, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 16, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 2, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
        { day: 3, available: true },
        { day: 4, available: true },
      ]),
    );
  });
});
