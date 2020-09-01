import AppError from '@shared/errors/AppError';

import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUserTokensRepository: FakeUserTokensRepository;
let fakesUsersRepositories: FakesUsersRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakesUsersRepositories = new FakesUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakesUsersRepositories,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakesUsersRepositories.create({
      email: 'teste@gmail.com',
      name: 'teste',
      password: '123456',
    });
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updateUser = await fakesUsersRepositories.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '1223123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-token',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '1223123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakesUsersRepositories.create({
      email: 'teste@gmail.com',
      name: 'teste',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
