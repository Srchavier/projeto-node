import AppError from '@shared/errors/AppError';

import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakesUsersRepositories = new FakesUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakesUsersRepositories,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      email: 'teste@gmail.com',
      name: 'teste',
      password: 'teste',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('teste@gmail.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakesUsersRepositories = new FakesUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakesUsersRepositories,
      fakeHashProvider,
    );

    await createUserService.execute({
      email: 'teste@gmail.com',
      name: 'teste',
      password: 'teste',
    });

    expect(
      createUserService.execute({
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
