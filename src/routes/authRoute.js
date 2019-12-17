import { Router } from 'express';

import Signup from '../controller/auth';

const authRoute = Router();

authRoute.post('/signup', Signup);

export default authRoute;
