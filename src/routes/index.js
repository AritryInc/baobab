import { Router } from 'express';
import authRoute from './authRoute';
import user from './user';
import organization from './organization';

const route = Router();

route.use('/auth', authRoute);
route.use('/:orgId', );
route.use('/user', user);
route.use('/organiztion', organization);

export default route;
