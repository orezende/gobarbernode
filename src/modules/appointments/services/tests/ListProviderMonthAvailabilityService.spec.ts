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
      date: new Date(2020, 3, 1, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 1, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 1, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 2, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
