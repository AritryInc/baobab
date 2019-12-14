import models from '../db/models';

const { User, Organization } = models;
const SignUp = async (req, res) => {
  const { email, organizationName } = req.body;
  try {
    const user = await User.create({ email })
    const createdBy = await user.id;
    const organization = await Organization.create({ organizationName, createdBy })
    return res.json({
      status: 201,
      user,
      organization,
      message: 'User created successfully'
    })
  } catch (err) {
    return res.json({
      status: 500,
      err
    })
  }

}

export default SignUp;
