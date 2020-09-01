import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

class UserRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(useData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      useData,
    );

    this.users.push(user);

    return user;
  }

  public async save(useData: User): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === useData.id);

    this.users[findIndex] = useData;

    return useData;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }
}

export default UserRepository;
