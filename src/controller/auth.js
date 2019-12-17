import crypto from 'crypto';
import models from '../db/models';
import { createAndSyncDB } from '../db/local-models';

const { User, Organization } = models;

const SignUp = async (req, res) => {
  const { email, organization } = req.body;
  try {
    const user = await User.create({
      id: `usr_${crypto.randomBytes(8).toString('hex')}`,
      email,
    });

    const org = await Organization.create({
      id: `org_${crypto.randomBytes(8).toString('hex')}`,
      name: organization,
      createdBy: user.id,
    });

    await createAndSyncDB(org.id);

    return res.json({
      status: 201,
      user,
      organization,
      message: 'User created successfully',
    });
  } catch (err) {
    return res.json({
      status: 500,
      err,
    });
  }
};

export default SignUp;
