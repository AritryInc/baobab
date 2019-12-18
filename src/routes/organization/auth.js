import { Router } from 'express';
import * as auth from '../../controller/organization/auth';

const route = Router();

route.post('/signup', auth.signup);

route.post('/signin', auth.signin);

export default route;
