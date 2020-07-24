import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '../ListProvidersService';

describe('ListProviders context', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let listProvidersService: ListProvidersService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johnTre@mail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnQua@mail.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      exceptUserId: loggedUser.id,
    });

    expect(providers).not.toContain(loggedUser);
  });
});
