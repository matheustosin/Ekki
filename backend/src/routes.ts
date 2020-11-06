import { Router } from 'express';

import UserController from './controllers/UserController';
import ContactController from './controllers/ContactController';
import AccountController from './controllers/AccountController';

const routes = Router();

routes.post('/user', UserController.create);
routes.get('/user/:id', UserController.show);
routes.get('/user', UserController.index);
routes.get('/user/extract/transfers', UserController.getExtract);

routes.post('/account', AccountController.create);
routes.get('/account/transfer', AccountController.index);
routes.post('/account/transfer', AccountController.transfer);

routes.post('/contact', ContactController.create);
routes.get('/contact', ContactController.index);
routes.delete('/contact/:id', ContactController.delete);
routes.get('/contact/:id', ContactController.findByAccountNumber);

export default routes;