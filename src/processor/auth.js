import crypto from 'crypto';
import models from '../db/models';
import { createDB } from '../db/local-models';

export const signup = async (userData) => {
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
};
