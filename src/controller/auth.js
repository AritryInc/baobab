import crypto from 'crypto';
import models from '../db/models';
import { createDB } from '../db/local-models';
import Async from '../utils/async-wrapper';

const { User, Organization } = models;

export const SignUp = Async(async (req, res) => {
  const { email, organization } = req.body;
  const user = await User.create({
    id: `usr_${crypto.randomBytes(8).toString('hex')}`,
    email,
  });

  const org = await Organization.create({
    id: `org_${crypto.randomBytes(8).toString('hex')}`,
    name: organization,
    createdBy: user.id,
  });

  await createDB(org.id);

  return res.json({
    user,
    organization: org,
    message: 'User created successfully',
  });
});
