import FakesUsersRepository from '@modules/users/repositories/fakes/FakesUsersRepository';
import ListProvidersServices from './ListProvidersService';

let fakesUsersRepository: FakesUsersRepository;
let listProviders: ListProvidersServices;

describe('ListProviders', () => {
  beforeEach(() => {
    fakesUsersRepository = new FakesUsersRepository();
    listProviders = new ListProvidersServices(fakesUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakesUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    });
    const user2 = await fakesUsersRepository.create({
      name: 'teste1',
      email: 'teste@gmail1.com',
      password: 'teste',
    });
    const loggedUser = await fakesUsersRepository.create({
      name: 'exception_id',
      email: 'exception_id@gmail.com',
      password: 'exception_id',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
