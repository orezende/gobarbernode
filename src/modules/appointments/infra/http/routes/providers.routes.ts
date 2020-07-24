import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRoute = Router();
const providersController = new ProvidersController();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', providersController.index);

export default providersRoute;
