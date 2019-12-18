import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { getDB } from '../../db/local-models';

export const signup = async (userData) => {
  try {
    const { email, password, organizationId } = userData;

    const model = await getDB(organizationId);

    const user = await model.User.create({
      id: `usr_${crypto.randomBytes(8).toString('hex')}`,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    return user;
  } catch (error) {
    if (error.name === 'SequelizeConstraintError') {
      const err = Error('user already exists');
      err.status = 500;
      throw err;
    }

    throw error;
  }
};

export const signin = () => 0;
