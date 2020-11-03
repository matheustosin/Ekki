import { Router } from 'express';
import PartnerController from './controllers/PartnerController';


const routes = Router();

routes.post('/partner', PartnerController.create);



export default routes;