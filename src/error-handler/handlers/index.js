import organizationHandlers from './organization';
import auth from './auth';

export default [
  ...organizationHandlers,
  auth,
];
