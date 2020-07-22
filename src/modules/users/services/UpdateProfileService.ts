import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, name, email }: IRequest): Promise<void> {}
}
