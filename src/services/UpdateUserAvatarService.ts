import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await !!(await fs.promises
        .stat(userAvatarFilePath)
        .catch(() => false));

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}
