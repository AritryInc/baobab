import { Router } from 'express';
import * as controller from '../../controller/organization/auth';
import * as validator from '../../middleware/validator/organization/auth';

const route = Router();

route.post('/signup', validator.signup, controller.signup);

route.post('/signin', validator.signin, controller.signin);

export default route;
