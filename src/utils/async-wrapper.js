import Error from '../error-handler';

export default (func) => (req, res, next) => func(req, res, next)
  .catch((err) => (err.isCustomError ? next(err) : next(new Error(err))));
