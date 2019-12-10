import { Router } from 'express';
import authRoute from './authRoute';

const route = Router();

route.use('/auth', authRoute);

export default route;