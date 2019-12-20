import { Router } from 'express';
import * as controller from '../controller/auth';
import * as validator from '../middleware/validator/auth';

const route = Router();

route.post('/signup', validator.signUp, controller.signUp);

export default route;
