import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from '../UpdateProfileService';

describe('UpdateProfile context', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfileService: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update a user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      name: 'John Trê',
      email: 'johntre@mail.com',
    });

    expect(updatedUser).toMatchObject({
      id: user.id,
      name: 'John Trê',
      email: 'johntre@mail.com',
    });
  });

  it('should be able to update the profile from non-existing user', async () => {
    expect(
      updateProfileService.execute({
        id: 'non-existing-user',
        name: 'non-existing-user',
        email: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Cleitun',
      email: 'teste@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        name: 'John Trê',
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      email: 'mail@mail.com',
      name: 'esnothing',
      oldPassword: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        email: 'mail@mail.com',
        name: 'esnothing',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        email: 'mail@mail.com',
        name: 'esnothing',
        password: '123123',
        oldPassword: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
