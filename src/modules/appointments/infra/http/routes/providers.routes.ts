import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRoute = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', providersController.index);

providersRoute.get(
  '/:providerId/month-availability',
  providerMonthAvailabilityController.index,
);

providersRoute.get(
  '/:providerId/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRoute;
