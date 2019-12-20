import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { getDB } from '../../db/local-models';
import { Organization } from '../../db/models';
import errorHandler from '../../error-handler';

const Error = errorHandler.withDetails;

const checkIfOrgExists = async (id) => {
  const organization = await Organization.findOne({ where: { id } });

  if (!organization) throw Error(404, { organizationId: 'organization not found' });

  return true;
};


export const signup = async (userData) => {
  const { email, password, organizationId } = userData;

  await checkIfOrgExists(organizationId);

  const model = await getDB(organizationId);
  const user = await model.User.create({
    id: `usr_${crypto.randomBytes(8).toString('hex')}`,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  return user;
};

export const signin = async (userData) => {
  const { email, password, organizationId } = userData;

  await checkIfOrgExists(organizationId);

  const model = await getDB(organizationId);
  const user = await model.User.findOne({
    where: {
      email,
    },
  });

  const hashedPassword = user ? user.password : '';
  const validPassword = bcrypt.compareSync(password, hashedPassword);

  if (!validPassword) {
    throw Error(404, 'email or password incorrect');
  }
  return user;
};
