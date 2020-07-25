import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '../AuthenticateUserService';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUserService context', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let authenticateUserService: AuthenticateUserService;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@mail.com',
      password: '123456',
      name: 'John Doe',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authenticateUserService.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@mail.com',
      password: '123456',
      name: 'John Doe',
    });

    expect(
      authenticateUserService.execute({
        email: 'johndoe@mail.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
