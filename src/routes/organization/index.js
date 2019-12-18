import { Router } from 'express';
import auth from './auth';

const route = Router();

route.use('/auth', auth);

// route.get('/users', getAll);

export default route;
