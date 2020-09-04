import AppError from '@shared/errors/AppError';

import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakesUsersRepositories: FakesUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakesUsersRepositories = new FakesUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakesUsersRepositories,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakesUsersRepositories,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      email: 'teste@gmail.com',
      name: 'teste',
      password: 'teste',
    });

    const resposta = await authenticateUserService.execute({
      email: 'teste@gmail.com',
      password: 'teste',
    });

    expect(resposta).toHaveProperty('token');
    expect(resposta.user).toEqual(user);
    expect(
      authenticateUserService.execute({
        email: 'teste@gmail.com.br',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUserService.execute({
        email: 'teste@gmail.com',
        password: 'testee',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authenticateUserService.execute({
        email: 'teste@gmail.com',
        password: 'testee',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      email: 'teste@gmail.com',
      name: 'teste',
      password: 'teste',
    });

    expect(
      authenticateUserService.execute({
        email: 'teste@gmail.com',
        password: 'testee',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
