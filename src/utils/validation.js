export const transformJoiError = (error) => error.details
  .reduce((acc, err) => ({ ...acc, [err.path[0]]: err.message }), {});
