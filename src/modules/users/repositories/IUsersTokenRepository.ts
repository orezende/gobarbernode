import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokenRepository {
  generate(userId: string): Promise<UserToken>;
}
