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

    expect(
      updateProfileService.execute({
        id: user.id,
        name: 'John Trê',
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
