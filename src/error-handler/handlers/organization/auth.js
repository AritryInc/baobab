import * as constraints from '../../../db/database-constraints';

export default (error) => {
  let status;
  let content;

  if (error.name === 'SequelizeUniqueConstraintError') {
    status = 409;

    switch (error.original.constraint) {
      case constraints.LOCAL_UNIQUE_EMAIL:
        content = { email: 'email already exists in this organization' };
        break;

      default:
        break;
    }
  }

  return { status, content };
};
