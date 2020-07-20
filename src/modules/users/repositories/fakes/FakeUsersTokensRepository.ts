import { uuid } from 'uuidv4';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUsersTokenRepository implements IUsersTokenRepository {
  private usersTokens: Array<UserToken> = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId: uuid(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
}

export default FakeUsersTokenRepository;
