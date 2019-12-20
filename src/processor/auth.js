import crypto from 'crypto';
import bcrypt from 'bcrypt';
import models from '../db/models';
import { createDB } from '../db/local-models';
import Error from '../utils/error-handler';

export const signup = async (userData) => {
  try {
    const user = await models.User.create({
      id: `usr_${crypto.randomBytes(8).toString('hex')}`,
      email: userData.email,
    });

    const organization = await models.Organization.create({
      id: `org_${crypto.randomBytes(8).toString('hex')}`,
      name: userData.organization,
      createdBy: user.id,
    });

    await createDB(organization.id);

    return { user, organization };
  } catch (error) {
    if (error.name === 'SequelizeConstraintError') {
      const err = Error('user already exists');
      err.status = 500;
      throw err;
    }

    throw error;
  }
};
