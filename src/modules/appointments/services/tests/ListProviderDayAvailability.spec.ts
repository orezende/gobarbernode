import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '../ListProviderDayAvailabilityService';

describe('ListProvidersMonthAvailability context', () => {
  let fakeAppointmentRepository: FakeAppointmentRepository;
  let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      providerId: 'fake-user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'fake-user',
      userId: 'fake-user-id',
      date: new Date(2020, 4, 1, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 1, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      providerId: 'fake-user',
      day: 1,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
