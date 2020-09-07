import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakesUsersRepository: FakesUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakesUsersRepository = new FakesUsersRepository();
    updateProfileService = new UpdateProfileService(
      fakesUsersRepository,
      fakeHashProvider,
    );
  });
  it('should not be able to update profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'not-user',
        name: 'teste12',
        email: 'teste12@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update profile', async () => {
    const user = await fakesUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'teste12',
      email: 'teste12@gmail.com',
    });

    expect(updateUser.name).toBe('teste12');
    expect(updateUser.email).toBe('teste12@gmail.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakesUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@gmail.com',
      password: 'teste',
    });

    const user = await fakesUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'teste12',
        email: 'eduardo@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakesUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123123',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'teste12',
      email: 'teste12@gmail.com',
      old_password: '123123',
      password: '123456',
    });

    expect(updateUser.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakesUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'teste12',
        email: 'teste12@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakesUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'teste12',
        email: 'teste12@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
