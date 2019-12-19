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

export const signin = async (userData) => {
  try {
    const { email, password, organizationId } = userData;
    const model = await getDB(organizationId);
    const user = await model.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return ('user not found');
    }
    const hashedPassword = user.password;
    const validPassword = bcrypt.compareSync(password, hashedPassword);
    if (!validPassword) {
      return ('invalid password');
    }
    return user;
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const err = Error('invalid user');
      err.status = 500;
      throw err;
    }
    throw error;
  }
};
