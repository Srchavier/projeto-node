import AppError from '@shared/errors/AppError';

import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakesUsersRepository: FakesUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakesUsersRepository = new FakesUsersRepository();
    showProfileService = new ShowProfileService(fakesUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakesUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('teste');
    expect(profile.email).toBe('teste@gmail.com');
  });

  it('should not be able to show profile the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'not-profile',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
