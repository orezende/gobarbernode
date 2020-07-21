import { getRepository, Repository } from 'typeorm';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userId,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }
}

export default UsersTokensRepository;
