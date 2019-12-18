import { Router } from 'express';
import auth, { getAll } from '../../controller/authOrg';

const route = Router();

route.post('/auth', auth);

route.get('/users', getAll);

export default route;
