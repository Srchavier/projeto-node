import AppError from '@shared/errors/AppError';

import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakesUsersRepositories: FakesUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakesUsersRepositories = new FakesUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakesUsersRepositories,
      fakeHashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'teste@gmail.com',
      name: 'teste',
      password: 'teste',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('teste@gmail.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
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
