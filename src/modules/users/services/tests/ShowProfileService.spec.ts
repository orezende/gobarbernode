import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from '../ShowProfileService';

describe('UpdateProfile context', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let showProfileService: ShowProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show a user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute(user.id);

    expect(profile).toMatchObject({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute('non-existing user'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
