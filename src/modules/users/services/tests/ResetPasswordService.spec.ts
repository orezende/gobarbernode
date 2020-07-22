import AppError from '@shared/errors/AppError';
import ResetPasswordService from '../ResetPasswordService';
import FakeUserRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../../repositories/fakes/FakeUsersTokensRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

describe('ResetPassword context', () => {
  let resetPasswordService: ResetPasswordService;
  let fakeUserRepository: FakeUserRepository;
  let fakeUsersTokenRepository: FakeUsersTokenRepository;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUsersTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      email: 'johndoe@mail.com',
      name: 'john dowe',
      password: '123456',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toBeCalledWith('123123');
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokenRepository.generate('non-existing');

    await expect(
      resetPasswordService.execute({
        token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      email: 'johndoe@mail.com',
      name: 'john dowe',
      password: '123456',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
