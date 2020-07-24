import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: Array<User> = [];

  public async findAllProviders({
    exceptUserId,
  }: IFindAllProvidersDTO): Promise<Array<User>> {
    if (exceptUserId) {
      return this.users.filter(user => user.id !== exceptUserId);
    }

    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
      },
      userData,
    );

    this.users.push(user);

    return user;
  }

  public async save(userData: User): Promise<User> {
    const findeIndex = this.users.findIndex(user => user.id === userData.id);

    this.users[findeIndex] = userData;

    return userData;
  }
}

export default FakeUsersRepository;
