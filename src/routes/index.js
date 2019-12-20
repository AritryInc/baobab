import { Router } from 'express';
import auth from './auth';
import organization from './organization';

const route = Router();

route.use('/organization', organization);

route.use('/auth', auth);

export default route;
