import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
