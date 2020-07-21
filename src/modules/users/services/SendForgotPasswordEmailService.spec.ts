import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokensRepository';

describe('SendForgotPasswordEmail context', () => {
  let sendForgotPasswordEmailService: SendForgotPasswordEmailService;
  let fakeUserRepository: FakeUserRepository;
  let fakeMailProvider: FakeMailProvider;
  let fakeUsersTokenRepository: FakeUsersTokenRepository;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      email: 'johndoe@mail.com',
      name: 'john dowe',
      password: '1234567',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const { id } = await fakeUserRepository.create({
      email: 'johndoe@mail.com',
      name: 'john dowe',
      password: '1234567',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@mail.com',
    });

    expect(generate).toHaveBeenCalledWith(id);
  });
});
