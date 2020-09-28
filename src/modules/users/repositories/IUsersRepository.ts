import IFindAllProviderDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';
import ICreateUserDto from '../dtos/ICreateUserDTO';

import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProviderDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
