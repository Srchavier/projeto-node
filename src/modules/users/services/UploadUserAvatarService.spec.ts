import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import UploadUserAvatarService from './UploadUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakesUsersRepositories = new FakesUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const createUserService = new UploadUserAvatarService(
      fakesUsersRepositories,
      fakeStorageProvider,
    );

    const user = await fakesUsersRepositories.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    });

    await createUserService.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakesUsersRepositories = new FakesUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const createUserService = new UploadUserAvatarService(
      fakesUsersRepositories,
      fakeStorageProvider,
    );

    expect(
      createUserService.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakesUsersRepositories = new FakesUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const createUserService = new UploadUserAvatarService(
      fakesUsersRepositories,
      fakeStorageProvider,
    );

    const user = await fakesUsersRepositories.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    });

    await createUserService.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });

    await createUserService.execute({
      avatarFilename: 'avatar2.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
