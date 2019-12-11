import { Router } from 'express';

import Signup from '../controller/auth';
import { authValidator } from '../middleware/ValidateSchema';

const authRoute = Router();

authRoute.post('/signup', authValidator, Signup);

export default authRoute;