import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgodPasswordEmaiService';

let fakeUserTokensRepository: FakeUserTokensRepository;
let fakesUsersRepositories: FakesUsersRepository;
let fakeEMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakesUsersRepositories = new FakesUsersRepository();
    fakeEMailProvider = new FakeMailProvider();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakesUsersRepositories,
      fakeEMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using emaiil', async () => {
    const sendEmail = jest.spyOn(fakeEMailProvider, 'sendEmail');

    fakesUsersRepositories.create({
      email: 'teste@gmail.com',
      name: 'teste',
      password: '1231223',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'teste@gmail.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'teste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakesUsersRepositories.create({
      email: 'teste@gmail.com',
      name: 'teste',
      password: '1231223',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'teste@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
