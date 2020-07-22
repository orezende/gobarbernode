import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '../UpdateUserAvatarService';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar context', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeStorageProvider: FakeStorageProvider;
  let updateUserAvatarService: UpdateUserAvatarService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFileName: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update avatar from non existing user', async () => {
    expect(
      updateUserAvatarService.execute({
        userId: 'nono',
        avatarFileName: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update avatar from non existing user', async () => {
    expect(
      updateUserAvatarService.execute({
        userId: 'nono',
        avatarFileName: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFileName: 'avatar.png',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFileName: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
