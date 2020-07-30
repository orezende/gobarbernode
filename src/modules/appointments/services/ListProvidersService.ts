import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  exceptUserId?: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ exceptUserId }: IRequest): Promise<Array<User>> {
    let users = await this.cacheProvider.recover<Array<User>>(
      `providers-list:${exceptUserId}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptUserId,
      });

      await this.cacheProvider.save(
        `providers-list:${exceptUserId}`,
        classToClass(users),
      );
    }

    return users;
  }
}
